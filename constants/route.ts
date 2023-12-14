const ROUTE = {
  BASE: "/",
  SAN_BONG: {
    INDEX: "/san-bong",
    ID: "/san-bong/:id",
    BOOK: "/san-bong/:id/dat-san",
  },
  GIAI_DAU: {
    INDEX: "/giai-dau",
    ID: "/giai-dau/:id",
  },
  HO_SO: {
    INDEX: "/ho-so",
    ID: "/ho-so/:id",
  },
  DOI_BONG: {
    INDEX: "/doi-bong",
    ID: "/doi-bong/:id",
  },
  CHI_NHANH: {
    INDEX: "/chi-nhanh",
    ID: "/chi-nhanh/:id",
  },
  AUTH: {
    SIGN_IN: "/dang-nhap",
    SIGN_UP: "/dang-ky",
    FORGOT_PASSWORD: "/quen-mat-khau",
  },
}

export default ROUTE
