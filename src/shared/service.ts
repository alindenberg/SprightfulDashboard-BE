function format_error_response(error: Error) {
  return {
    'error': error.message
  }
}

export {
  format_error_response
}