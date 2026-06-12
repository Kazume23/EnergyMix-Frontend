export type ApiRequestOptions = {
  signal?: AbortSignal
}

export type ApiRequestErrorCode =
  | 'aborted'
  | 'http'
  | 'invalid-response'
  | 'network'

type ResponseParser<TResponse> = (response: unknown) => TResponse

export class ApiRequestError extends Error {
  readonly code: ApiRequestErrorCode

  readonly status?: number

  constructor(
    message: string,
    code: ApiRequestErrorCode,
    status?: number,
  ) {
    super(message)
    this.code = code
    this.status = status
    this.name = 'ApiRequestError'
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function buildApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`
}

function connectAbortSignals(
  controller: AbortController,
  externalSignal: AbortSignal | undefined,
) {
  if (!externalSignal) {
    return undefined
  }

  const abortRequest = () => {
    controller.abort()
  }

  if (externalSignal.aborted) {
    abortRequest()
    return undefined
  }

  externalSignal.addEventListener('abort', abortRequest, { once: true })

  return () => {
    externalSignal.removeEventListener('abort', abortRequest)
  }
}

export function isAbortError(error: unknown) {
  return error instanceof ApiRequestError && error.code === 'aborted'
}

export async function requestJson<TResponse>(
  path: string,
  parseResponse: ResponseParser<TResponse>,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const controller = new AbortController()
  const disconnectAbortSignals = connectAbortSignals(controller, options.signal)

  try {
    const response = await fetch(buildApiUrl(path), {
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new ApiRequestError(
        'API returned an unsuccessful response.',
        'http',
        response.status,
      )
    }

    let responseBody: unknown

    try {
      responseBody = await response.json()
    } catch {
      throw new ApiRequestError(
        'API returned a response that is not valid JSON.',
        'invalid-response',
      )
    }

    try {
      return parseResponse(responseBody)
    } catch {
      throw new ApiRequestError(
        'API returned data that does not match the expected contract.',
        'invalid-response',
      )
    }
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error
    }

    if (controller.signal.aborted) {
      throw new ApiRequestError('API request was cancelled.', 'aborted')
    }

    throw new ApiRequestError('Network request failed.', 'network')
  } finally {
    disconnectAbortSignals?.()
  }
}
