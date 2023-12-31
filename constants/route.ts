const ROUTE = {
  BASE: "/",
  SAN_BONG: {
    INDEX: "/san-bong",
    ID: "/san-bong/:id",
    BOOK: "/san-bong/:id/dat-san",
    REPORT: "/san-bong/:id/to-cao",
  },
  GIAI_DAU: {
    INDEX: "/giai-dau",
    ID: "/giai-dau/:id",
    JOIN: "/giai-dau/:id/tham-gia",
    MATCH: "/giai-dau/:id/:matchId",
  },
  HO_SO: {
    INDEX: "/ho-so",
    ID: "/ho-so/:id",
    TEAM: "/ho-so/:id/doi-bong",
    EDIT: "/ho-so/:id/chinh-sua",
    REPORT: "/ho-so/:id/to-cao",
  },
  DOI_BONG: {
    INDEX: "/doi-bong",
    ID: "/doi-bong/:id",
    MANAGE: {
      INDEX: "/doi-bong/quan-ly",
      CREATE: "/doi-bong/quan-ly/tao",
      CREATED: {
        INDEX: "/doi-bong/quan-ly/da-tao",
        ID: "/doi-bong/quan-ly/da-tao/:id",
        INFO: "/doi-bong/quan-ly/da-tao/:id/thong-tin",
        EDIT: "/doi-bong/quan-ly/da-tao/:id/chinh-sua",
        MEMBER: {
          INDEX: "/doi-bong/quan-ly/da-tao/:id/quan-ly-thanh-vien",
          INVITE: "/doi-bong/quan-ly/da-tao/:id/quan-ly-thanh-vien/moi-thanh-vien",
          REQUEST: "/doi-bong/quan-ly/da-tao/:id/quan-ly-thanh-vien/yeu-cau-tham-gia",
        },
        DELETE: "/doi-bong/quan-ly/da-tao/:id/xoa",
      },
      JOINED: {
        INDEX: "/doi-bong/quan-ly/da-tham-gia",
        ID: "/doi-bong/quan-ly/da-tham-gia/:id",
        INFO: "/doi-bong/quan-ly/da-tham-gia/:id/thong-tin",
        LEAVE: "/doi-bong/quan-ly/da-tham-gia/:id/roi-khoi",
      },
      INVITEMENTS: "/doi-bong/quan-ly/loi-moi",
    },
    JOIN: "/doi-bong/:id/tham-gia",
    REPORT: "/doi-bong/:id/to-cao",
  },
  CHI_NHANH: {
    INDEX: "/chi-nhanh",
    ID: "/chi-nhanh/:id",
    REPORT: "/chi-nhanh/:id/to-cao",
  },
  AUTH: {
    SIGN_IN: "/dang-nhap",
    SIGN_UP: "/dang-ky",
    FORGOT_PASSWORD: "/quen-mat-khau",
  },
}

export default ROUTE
