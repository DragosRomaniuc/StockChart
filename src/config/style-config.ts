export enum Colors {
  PRIMARY_MAIN_COLOR = '#0f99d6',
  PRIMARY_DARK_COLOR = '#034694',
  SUCCESS_COLOR = '#8dc63f',
  ERROR_MAIN_COLOR = '#ff0000',
  SWITCH_LIGHT_BLUE = '#cfebf7',
  SWITCH_LIGHT_GREY = '#b0b0b0',
  SWITCH_DISABLED_GREY = '#efefef',
  SWITCH_DARK_GREY = '#505050',
  BLACK_MEDIUM = 'rgba(0, 0, 0, 0.8)',
  WHITE = '#fff',
  BLACK = '#000',
  CARD_BORDER = '#f0f0f0'
}

export enum Fonts {
  FONT_FAMILY = '"Open Sans", "Helvetica", "Arial", sans-serif'
}
export enum FontWeight {
  MEDIUM = 600
}

export enum Breakpoints {
  XS = 0,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200
}

export const appTheme = {
  typography: {
    fontFamily: Fonts.FONT_FAMILY,
    fontWeightMedium: FontWeight.MEDIUM,
    body2: {
      fontSize: '0.75rem'
    }
  },
  palette: {
    primary: {
      main: Colors.PRIMARY_MAIN_COLOR,
      dark: Colors.PRIMARY_DARK_COLOR
    },
    secondary: {
      main: Colors.SUCCESS_COLOR
    },
    error: {
      main: Colors.ERROR_MAIN_COLOR
    }
  },
  breakpoints: {
    values: {
      xs: Breakpoints.XS,
      sm: Breakpoints.SM,
      md: Breakpoints.MD,
      lg: Breakpoints.LG,
      xl: Breakpoints.XL
    }
  }
};
