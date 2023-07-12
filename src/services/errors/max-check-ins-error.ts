

export class MaxCheckinsError extends Error {
  constructor() {
    super('Max number of check-ins reached')
  }
}