const CACHE_TAGS = {
  AUTH: {
    LOAD_GUEST: "load-guest",
    AUTH_GUEST: "auth-guest",
  },
  GUEST: {
    GET_BY_ID: "get-guest-by-id",
  },
  FIELD: {
    GET_ALL: "get-all-fields",
    GET_BY_ID: "get-field-by-id",
    GET_BY_ADDRESS: "get-field-by-address",
    GET_BOOKED: "get-field-booked",
  },
  FIELD_BOOKED_QUEUE: {
    GET_FIELD_BOOKED_QUEUE: "get-field-booked-queue",
  },
  TOURNAMENT: {
    GET_ALL: "get-all-tournaments",
    GET_HAPPENING: "get-happening-tournaments",
    GET_BY_ID: "get-tournament-by-id",
  },
  BRANCH: {
    GET_ALL: "get-all-branches",
    GET_BY_ID: "get-branch-by-id",
    GET_BY_ADDRESS: "get-branch-by-address",
    GET_FIELD: "get-branch-fields",
    GET_TOURNAMENT: "get-branch-tournaments",
  },
  RATE: {
    OBJECT: "get-object-rates",
  },
  REPORT: {},
  TEAM: {
    GET_ALL: "get-all-teams",
    GET_BY_ID: "get-team-by-id",
    GET_BY_NAME: "get-team-by-name",
    GET_BY_CAPTAIN: "get-team-by-captain",
    GET_BY_MEMBER: "get-team-by-member",
    GET_GUEST_JOINT: "get-guest-joint-teams",
  },
  INVITEMENT: {
    GET_BY_TEAM: "get-invitements-by-team",
    GET_BY_GUEST: "get-invitements-by-guest",
    GET_TEAM_REQUEST: "get-team-requests",
  },
  MATCH: {
    GET_ALL: "get-all-matches",
    GET_BY_ID: "get-match-by-id",
  },
}

export default CACHE_TAGS
