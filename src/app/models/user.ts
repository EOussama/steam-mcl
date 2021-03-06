import { App } from './app';
import { EPersonStates } from '../enums/personstates.enum';

/**
 * The user's interface
 */
export interface IUser {

  /**
   * The Steam ID of the user
   */
  steamid: string;

  /**
   * The state of the profile
   */
  personastate: EPersonStates;

  /**
   * The user' Steam level
   */
  level: number;

  /**
   * The name of the user
   */
  personaname: string;

  /**
   * The profile's url
   */
  profileurl: string;

  /**
   * The avatar's link
   */
  avatarfull: string;

  /**
   * Last log-off timestamp
   */
  lastlogoff: number;

  /**
   * The real name of the user
   */
  realname?: string;

  /**
   * Creation timestamp
   */
  timecreated?: number;

  /**
   * The apps list
   */
  apps?: App[];
}

/**
 * The user's class
 */
export class User {

  //#region Properties

  /**
   * The Steam ID of the user
   */
  id: string;

  /**
   * The state of the profile
   */
  state: EPersonStates;

  /**
   * The user' Steam level
   */
  level: number;

  /**
   * The name of the user
   */
  username: string;

  /**
   * The profile's url
   */
  profileurl: string;

  /**
   * The avatar's link
   */
  avatar: string;

  /**
   * Last log-off timestamp
   */
  lastOnline: Date;

  /**
   * The real name of the user
   */
  realname?: string;

  /**
   * Creation timestamp
   */
  creationTime?: Date;

  /**
   * The apps list
   */
  apps: App[];

  //#endregion

  //#region The constructor

  /**
   * Instantiates a new user object
   *
   * @param user The user object
   */
  constructor(user: IUser) {
    this.id = user.steamid;
    this.state = user.personastate;
    this.level = user.level || 0;
    this.username = user.personaname;
    this.realname = user.realname;
    this.profileurl = user.profileurl;
    this.avatar = user.avatarfull;
    this.creationTime = new Date(user.timecreated * 1000);
    this.lastOnline = new Date(user.lastlogoff * 1000);
    this.apps = user.apps;

    if (this.lastOnline.toString().toLowerCase() === 'invalid date') {
      this.lastOnline = null;
    }

    if (this.creationTime.toString().toLowerCase() === 'invalid date') {
      this.creationTime = null;
    }
  }

  //#endregion
}
