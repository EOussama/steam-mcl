/**
 * The error thrown when a profile URL is invalid
 */

import BaseError from "./base.error";

export default class InvalidProfileURLError extends BaseError {

  //#region Properties

  /**
   * The name of the error
   */
  public name: string = "InvalidProfileURLError";

  /**
   * The message of the error
   */
  public message: string = "The profile URL is invalid";

  //#endregion

  //#region Constructor

  /**
   * Constructor with parameters
   * 
   * @param message The message of the error
   */
  constructor(message: string) {

    // Calling the parent class
    super('');

    // Updating the error's message
    this.message = message.length > 0 ? message : this.message;
  }

  //#endregion
}