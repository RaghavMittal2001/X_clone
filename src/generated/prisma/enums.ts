
/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// @ts-nocheck 
/**
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/
export const NotificationType = {
  LIKE: 'LIKE',
  REPLY: 'REPLY',
  FOLLOW: 'FOLLOW',
  MESSAGE: 'MESSAGE'
} as const

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]
