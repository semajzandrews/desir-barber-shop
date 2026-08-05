/**
 * One place the shop's number lives. Every visible number and every tel:/sms:
 * href on this site is derived from PHONE_DIGITS below, so display and link can
 * never drift apart.
 */
import { formatPhone, telHref, smsHref } from "./phone";

const PHONE_DIGITS = "9736402740";

/**
 * Désir publishes no hours and no prices, and the ticket flow already tells the
 * customer the shop texts back the exact time. So the text branch invites the
 * one thing a barber actually needs before answering: a picture of the cut.
 */
export const SMS_BODY =
  "Photo of the cut I want is attached. Can you do it, and when can I sit?";

export const site = {
  phone: formatPhone(PHONE_DIGITS),
  phoneHref: telHref(PHONE_DIGITS),
  smsHref: smsHref(PHONE_DIGITS, SMS_BODY),
  smsBody: SMS_BODY,
  address: "522 William St, East Orange, NJ 07017",
};
