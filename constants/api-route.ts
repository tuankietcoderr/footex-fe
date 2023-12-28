const API_ROUTE = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:2003/api"
      : "https://footex.up.railway.app/api",
  BRANCH: {
    INDEX: "/branch",
    ID: "/branch/:id",
    OWNER: "/branch/owner",
    STATUS: "/branch/:id/status",
  },
  FIELD: {
    INDEX: "/field",
    ID: "/field/:id",
    BRANCH: "/field/branch/:id",
    STATUS: "/field/:id/status",
    NEAR_BY: "/field/near-by/branch/:id",
    SAVE: "/field/save",
    SAVED: "/field/saved/:userId",
    BOOKED: "/field/booked/:userId",
  },
  FIELD_BOOKED_QUEUE: {
    INDEX: "/field-booked-queue",
    ID: "/field-booked-queue/:id",
    STATUS: "/field-booked-queue/:id/status",
    FIELD: "/field-booked-queue/field/:id",
    GUEST: "/field-booked-queue/guest/:id",
  },
  GUEST: {
    INDEX: "/guest",
    EMAIL: "/guest/email",
    SIGN_IN: "/guest/signin",
    SIGN_UP: "/guest/signup",
    VERIFY_EMAIL: "/guest/verify-email",
    SEND_VERIFY_EMAIL: "/guest/send-verify-email",
    FORGOT_PASSWORD: "/guest/password/forgot",
    CHANGE_PASSWORD: "/guest/password/change",
    PHONE_NUMBER: "/guest/phone-number/:phone",
    AUTHORIZE: "/guest/authorize",
    ID: "/guest/:id",
    SEARCH_BY_EMAIL_OR_PHONE_NUMBER: "/guest/search/:emailOrPhoneNumber",
  },
  OWNER: {
    INDEX: "/owner",
    SIGN_IN: "/owner/signin",
    SIGN_UP: "/owner/signup",
    VERIFY_EMAIL: "/owner/verify-email",
    SEND_VERIFY_EMAIL: "/owner/send-verify-email",
    FORGOT_PASSWORD: "/owner/forgot-password",
  },
  TEAM: {
    INDEX: "/team",
    ID: "/team/:id",
    CAPTAIN: "/team/captain",
    GUEST: "/team/guest/:id",
    LEAVE: "/team/:id/leave",
    KICK: "/team/:id/kick",
  },
  INVITEMENT: {
    INDEX: "/invitement",
    ID: "/invitement/:id",
    STATUS: "/invitement/:id/status",
    GUEST: "/invitement/guest",
    TEAM: "/invitement/team/:id",
    TEAM_REQUEST: "/invitement/team/:id/request",
    REQUEST: "/invitement/request",
    REQUEST_ID: "/invitement/request/:id",
  },
  TOURNAMENT: {
    INDEX: "/tournament",
    ID: "/tournament/:id",
    HAPPENING: "/tournament/happening",
    GUEST_JOINT: "/tournament/joint",
    TEAM: "/tournament/team/:id",
    JOIN: "/tournament/:id/join",
    BRANCH: "/tournament/branch/:id",
  },
  MATCH: {
    INDEX: "/match",
    ID: "/match/:id",
  },
  MATCH_RESULT: {
    INDEX: "/match-result",
  },
  MATCH_RESULT_DETAIL: {
    INDEX: "/match-result-detail",
  },
  GOAL_DETAIL: {
    INDEX: "/goal-detail",
  },
  CARD_FINE: {
    INDEX: "/card-fine",
  },
  PRIZE: {
    INDEX: "/prize",
    ID: "/prize/:id",
    BRANCH: "/prize/branch/:id",
  },
  RATE: {
    INDEX: "/rate",
    OBJECT: `/rate/:objectType/:objectId`,
  },
  REPORT: {
    INDEX: "/report",
  },
}

export default API_ROUTE
