import type { EditorConfig, EditorPage, EditorProject } from "@brizy/builder";
import brizyIcons from "@brizy/builder/editor/icons/icons.svg";
import noImage from "../public/no_image_placeholder.svg";

export const pageData: EditorPage = {
  id: "1",
  status: "publish",
  data: {
    items: [
      {
        type: "Section2",
        value: {
          _id: "asdasdasd",
          items: [
            {
              type: "Section2Item",
              value: {
                _id: "asdasdasd111",
                items: [
                  {
                    type: "Wrapper2",
                    value: {
                      _id: "xx11aasd1233333",
                      items: [
                        {
                          type: "ThirdParty",
                          value: {
                            _id: "1asddccc",
                            thirdPartyId: "Brizy.ThirdParty.Button",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
  dataVersion: 0,
};

export const projectData: EditorProject = {
  id: "1",
  data: {
    selectedKit: "vnexmlshkihvcgsxmozgxzzdwsyvolvmhtne",
    selectedStyle: "kldugntsakdckzxhreidncqvgunudghrcuzv",
    styles: [
      {
        id: "kldugntsakdckzxhreidncqvgunudghrcuzv",
        title: "Default",
        colorPalette: [
          { id: "color1", hex: "#191b21" },
          { id: "color2", hex: "#142850" },
          { id: "color3", hex: "#239ddb" },
          { id: "color4", hex: "#66738d" },
          { id: "color5", hex: "#bde1f4" },
          { id: "color6", hex: "#eef0f2" },
          { id: "color7", hex: "#73777f" },
          { id: "color8", hex: "#ffffff" },
        ],
        fontStyles: [
          {
            deletable: "off",
            id: "paragraph",
            title: "Paragraph",
            fontFamily: "noto_serif",
            fontFamilyType: "google",
            fontSize: 16,
            fontSizeSuffix: "px",
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: 0,
            tabletFontSize: 15,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 300,
            tabletLineHeight: 1.6,
            tabletLetterSpacing: 0,
            mobileFontSize: 15,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 300,
            mobileLineHeight: 1.6,
            mobileLetterSpacing: 0,
          },
          {
            deletable: "off",
            id: "subtitle",
            title: "Subtitle",
            fontFamily: "noto_serif",
            fontFamilyType: "google",
            fontSize: 18,
            fontSizeSuffix: "px",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: 0,
            tabletFontSize: 17,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 300,
            tabletLineHeight: 1.5,
            tabletLetterSpacing: 0,
            mobileFontSize: 17,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 300,
            mobileLineHeight: 1.5,
            mobileLetterSpacing: 0,
          },
          {
            deletable: "off",
            id: "abovetitle",
            title: "Above Title",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 16,
            fontSizeSuffix: "px",
            fontWeight: 400,
            lineHeight: 1.7,
            letterSpacing: 2,
            tabletFontSize: 15,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 400,
            tabletLineHeight: 1.7,
            tabletLetterSpacing: 2,
            mobileFontSize: 13,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 400,
            mobileLineHeight: 1.7,
            mobileLetterSpacing: 2,
          },
          {
            deletable: "off",
            id: "heading1",
            title: "Heading 1",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 56,
            fontSizeSuffix: "px",
            fontWeight: 200,
            lineHeight: 1.3,
            letterSpacing: -1.5,
            tabletFontSize: 40,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 200,
            tabletLineHeight: 1.3,
            tabletLetterSpacing: -1,
            mobileFontSize: 34,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 200,
            mobileLineHeight: 1.3,
            mobileLetterSpacing: -1,
          },
          {
            deletable: "off",
            id: "heading2",
            title: "Heading 2",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 42,
            fontSizeSuffix: "px",
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: -1.5,
            tabletFontSize: 35,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 700,
            tabletLineHeight: 1.3,
            tabletLetterSpacing: -0.5,
            mobileFontSize: 29,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 700,
            mobileLineHeight: 1.3,
            mobileLetterSpacing: -0.5,
          },
          {
            deletable: "off",
            id: "heading3",
            title: "Heading 3",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 32,
            fontSizeSuffix: "px",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: -1,
            tabletFontSize: 27,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 600,
            tabletLineHeight: 1.3,
            tabletLetterSpacing: 0,
            mobileFontSize: 22,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 600,
            mobileLineHeight: 1.3,
            mobileLetterSpacing: 0,
          },
          {
            deletable: "off",
            id: "heading4",
            title: "Heading 4",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 26,
            fontSizeSuffix: "px",
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: -1,
            tabletFontSize: 24,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 500,
            tabletLineHeight: 1.4,
            tabletLetterSpacing: 0,
            mobileFontSize: 21,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 500,
            mobileLineHeight: 1.4,
            mobileLetterSpacing: 0,
          },
          {
            deletable: "off",
            id: "heading5",
            title: "Heading 5",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 20,
            fontSizeSuffix: "px",
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: 0,
            tabletFontSize: 19,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 500,
            tabletLineHeight: 1.4,
            tabletLetterSpacing: 0,
            mobileFontSize: 18,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 500,
            mobileLineHeight: 1.4,
            mobileLetterSpacing: 0,
          },
          {
            deletable: "off",
            id: "heading6",
            title: "Heading 6",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 17,
            fontSizeSuffix: "px",
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: 0,
            tabletFontSize: 16,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 500,
            tabletLineHeight: 1.4,
            tabletLetterSpacing: 0,
            mobileFontSize: 16,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 500,
            mobileLineHeight: 1.4,
            mobileLetterSpacing: 0,
          },
          {
            deletable: "off",
            id: "button",
            title: "Button",
            fontFamily: "montserrat",
            fontFamilyType: "google",
            fontSize: 12,
            fontSizeSuffix: "px",
            fontWeight: 600,
            lineHeight: 1.8,
            letterSpacing: 3,
            tabletFontSize: 12,
            tabletFontSizeSuffix: "px",
            tabletFontWeight: 600,
            tabletLineHeight: 1.8,
            tabletLetterSpacing: 3,
            mobileFontSize: 12,
            mobileFontSizeSuffix: "px",
            mobileFontWeight: 600,
            mobileLineHeight: 1.8,
            mobileLetterSpacing: 3,
          },
        ],
      },
    ],
    extraFontStyles: [],
    font: "lato",
    fonts: {
      config: {
        data: [
          {
            kind: "webfonts#webfont",
            family: "Lato",
            category: "sans-serif",
            variants: [
              "100",
              "100italic",
              "300",
              "300italic",
              "regular",
              "italic",
              "700",
              "700italic",
              "900",
              "900italic",
            ],
            subsets: ["latin-ext", "latin"],
            version: "v15",
            lastModified: "2019-03-26",
            files: {
              100: "http://fonts.gstatic.com/s/lato/v15/S6u8w4BMUTPHh30wWyWrFCbw7A.ttf",
              300: "http://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh7USew-FGC_p9dw.ttf",
              700: "http://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh6UVew-FGC_p9dw.ttf",
              900: "http://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf",
              "100italic": "http://fonts.gstatic.com/s/lato/v15/S6u-w4BMUTPHjxsIPy-vNiPg7MU0.ttf",
              "300italic": "http://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI9w2PHA3s5dwt7w.ttf",
              regular: "http://fonts.gstatic.com/s/lato/v15/S6uyw4BMUTPHvxk6XweuBCY.ttf",
              italic: "http://fonts.gstatic.com/s/lato/v15/S6u8w4BMUTPHjxswWyWrFCbw7A.ttf",
              "700italic": "http://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI5wqPHA3s5dwt7w.ttf",
              "900italic": "http://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI3wiPHA3s5dwt7w.ttf",
            },
            brizyId: "uzrpsocdxtgrkbxjjxkchqcybpvpzsuvdlji",
          },
          {
            kind: "webfonts#webfont",
            family: "Overpass",
            category: "sans-serif",
            variants: [
              "100",
              "100italic",
              "200",
              "200italic",
              "300",
              "300italic",
              "regular",
              "italic",
              "600",
              "600italic",
              "700",
              "700italic",
              "800",
              "800italic",
              "900",
              "900italic",
            ],
            subsets: ["latin", "latin-ext"],
            version: "v4",
            lastModified: "2019-07-17",
            files: {
              100: "http://fonts.gstatic.com/s/overpass/v4/qFdB35WCmI96Ajtm81nGU97gxhcJk1s.ttf",
              200: "http://fonts.gstatic.com/s/overpass/v4/qFdA35WCmI96Ajtm81lqcv7K6BsAikI7.ttf",
              300: "http://fonts.gstatic.com/s/overpass/v4/qFdA35WCmI96Ajtm81kOcf7K6BsAikI7.ttf",
              600: "http://fonts.gstatic.com/s/overpass/v4/qFdA35WCmI96Ajtm81l6d_7K6BsAikI7.ttf",
              700: "http://fonts.gstatic.com/s/overpass/v4/qFdA35WCmI96Ajtm81kedv7K6BsAikI7.ttf",
              800: "http://fonts.gstatic.com/s/overpass/v4/qFdA35WCmI96Ajtm81kCdf7K6BsAikI7.ttf",
              900: "http://fonts.gstatic.com/s/overpass/v4/qFdA35WCmI96Ajtm81kmdP7K6BsAikI7.ttf",
              "100italic": "http://fonts.gstatic.com/s/overpass/v4/qFdD35WCmI96Ajtm81Gga7rqwjUMg1siNQ.ttf",
              "200italic": "http://fonts.gstatic.com/s/overpass/v4/qFdC35WCmI96Ajtm81GgaxbL4h8ij1I7LLE.ttf",
              "300italic": "http://fonts.gstatic.com/s/overpass/v4/qFdC35WCmI96Ajtm81Gga3LI4h8ij1I7LLE.ttf",
              regular: "http://fonts.gstatic.com/s/overpass/v4/qFdH35WCmI96Ajtm82GiWdrCwwcJ.ttf",
              italic: "http://fonts.gstatic.com/s/overpass/v4/qFdB35WCmI96Ajtm81GgU97gxhcJk1s.ttf",
              "600italic": "http://fonts.gstatic.com/s/overpass/v4/qFdC35WCmI96Ajtm81GgawbO4h8ij1I7LLE.ttf",
              "700italic": "http://fonts.gstatic.com/s/overpass/v4/qFdC35WCmI96Ajtm81Gga2LP4h8ij1I7LLE.ttf",
              "800italic": "http://fonts.gstatic.com/s/overpass/v4/qFdC35WCmI96Ajtm81Gga37M4h8ij1I7LLE.ttf",
              "900italic": "http://fonts.gstatic.com/s/overpass/v4/qFdC35WCmI96Ajtm81Gga1rN4h8ij1I7LLE.ttf",
            },
            brizyId: "qwhwsomltrpyogspgbomkxquvqsqfdlvcnfo",
          },
          {
            kind: "webfonts#webfont",
            family: "Red Hat Text",
            category: "sans-serif",
            variants: ["regular", "italic", "500", "500italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"],
            version: "v1",
            lastModified: "2019-07-26",
            files: {
              500: "http://fonts.gstatic.com/s/redhattext/v1/RrQIbohi_ic6B3yVSzGBrMxYm4QIG-eFNVmULg.ttf",
              700: "http://fonts.gstatic.com/s/redhattext/v1/RrQIbohi_ic6B3yVSzGBrMxY04IIG-eFNVmULg.ttf",
              regular: "http://fonts.gstatic.com/s/redhattext/v1/RrQXbohi_ic6B3yVSzGBrMxgb60sE8yZPA.ttf",
              italic: "http://fonts.gstatic.com/s/redhattext/v1/RrQJbohi_ic6B3yVSzGBrMxQbacoMcmJPECN.ttf",
              "500italic": "http://fonts.gstatic.com/s/redhattext/v1/RrQKbohi_ic6B3yVSzGBrMxQbZ_cGO2BF1yELmgy.ttf",
              "700italic": "http://fonts.gstatic.com/s/redhattext/v1/RrQKbohi_ic6B3yVSzGBrMxQbZ-UHu2BF1yELmgy.ttf",
            },
            brizyId: "eytgthrgfzlrrzxlhynabspndabldgdbdjnm",
          },
          {
            kind: "webfonts#webfont",
            family: "DM Serif Text",
            category: "serif",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"],
            version: "v3",
            lastModified: "2019-07-16",
            files: {
              regular: "http://fonts.gstatic.com/s/dmseriftext/v3/rnCu-xZa_krGokauCeNq1wWyafOPXHIJErY.ttf",
              italic: "http://fonts.gstatic.com/s/dmseriftext/v3/rnCw-xZa_krGokauCeNq1wWyWfGFWFAMArZKqQ.ttf",
            },
            brizyId: "pujmflqmocbjojknwlnidilgqedjzqftpnrv",
          },
          {
            kind: "webfonts#webfont",
            family: "Blinker",
            category: "sans-serif",
            variants: ["100", "200", "300", "regular", "600", "700", "800", "900"],
            subsets: ["latin", "latin-ext"],
            version: "v1",
            lastModified: "2019-07-26",
            files: {
              100: "http://fonts.gstatic.com/s/blinker/v1/cIf_MaFatEE-VTaP_E2hZEsCkIt9QQ.ttf",
              200: "http://fonts.gstatic.com/s/blinker/v1/cIf4MaFatEE-VTaP_OGARGEsnIJkWL4.ttf",
              300: "http://fonts.gstatic.com/s/blinker/v1/cIf4MaFatEE-VTaP_IWDRGEsnIJkWL4.ttf",
              600: "http://fonts.gstatic.com/s/blinker/v1/cIf4MaFatEE-VTaP_PGFRGEsnIJkWL4.ttf",
              700: "http://fonts.gstatic.com/s/blinker/v1/cIf4MaFatEE-VTaP_JWERGEsnIJkWL4.ttf",
              800: "http://fonts.gstatic.com/s/blinker/v1/cIf4MaFatEE-VTaP_ImHRGEsnIJkWL4.ttf",
              900: "http://fonts.gstatic.com/s/blinker/v1/cIf4MaFatEE-VTaP_K2GRGEsnIJkWL4.ttf",
              regular: "http://fonts.gstatic.com/s/blinker/v1/cIf9MaFatEE-VTaPxCmrYGkHgIs.ttf",
            },
            brizyId: "yhkoopjikembswaygkzktfmiiashwjcrvbxr",
          },
          {
            kind: "webfonts#webfont",
            family: "Aleo",
            category: "serif",
            variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"],
            version: "v3",
            lastModified: "2019-07-16",
            files: {
              300: "http://fonts.gstatic.com/s/aleo/v3/c4mg1nF8G8_syKbr9DVDno985KM.ttf",
              700: "http://fonts.gstatic.com/s/aleo/v3/c4mg1nF8G8_syLbs9DVDno985KM.ttf",
              "300italic": "http://fonts.gstatic.com/s/aleo/v3/c4mi1nF8G8_swAjxeDdJmq159KOnWA.ttf",
              regular: "http://fonts.gstatic.com/s/aleo/v3/c4mv1nF8G8_s8ArD0D1ogoY.ttf",
              italic: "http://fonts.gstatic.com/s/aleo/v3/c4mh1nF8G8_swAjJ1B9tkoZl_Q.ttf",
              "700italic": "http://fonts.gstatic.com/s/aleo/v3/c4mi1nF8G8_swAjxaDBJmq159KOnWA.ttf",
            },
            brizyId: "ucgecsrbcjkpsfctgzwsocokuydcdgiubroh",
          },
          {
            kind: "webfonts#webfont",
            family: "Nunito",
            category: "sans-serif",
            variants: [
              "200",
              "200italic",
              "300",
              "300italic",
              "regular",
              "italic",
              "600",
              "600italic",
              "700",
              "700italic",
              "800",
              "800italic",
              "900",
              "900italic",
            ],
            subsets: ["latin", "vietnamese", "latin-ext"],
            version: "v11",
            lastModified: "2019-07-22",
            files: {
              200: "http://fonts.gstatic.com/s/nunito/v11/XRXW3I6Li01BKofA-sekZuHJeTsfDQ.ttf",
              300: "http://fonts.gstatic.com/s/nunito/v11/XRXW3I6Li01BKofAnsSkZuHJeTsfDQ.ttf",
              600: "http://fonts.gstatic.com/s/nunito/v11/XRXW3I6Li01BKofA6sKkZuHJeTsfDQ.ttf",
              700: "http://fonts.gstatic.com/s/nunito/v11/XRXW3I6Li01BKofAjsOkZuHJeTsfDQ.ttf",
              800: "http://fonts.gstatic.com/s/nunito/v11/XRXW3I6Li01BKofAksCkZuHJeTsfDQ.ttf",
              900: "http://fonts.gstatic.com/s/nunito/v11/XRXW3I6Li01BKofAtsGkZuHJeTsfDQ.ttf",
              "200italic": "http://fonts.gstatic.com/s/nunito/v11/XRXQ3I6Li01BKofIMN5MZ-vNWz4PDWtj.ttf",
              "300italic": "http://fonts.gstatic.com/s/nunito/v11/XRXQ3I6Li01BKofIMN4oZOvNWz4PDWtj.ttf",
              regular: "http://fonts.gstatic.com/s/nunito/v11/XRXV3I6Li01BKof4MuyAbsrVcA.ttf",
              italic: "http://fonts.gstatic.com/s/nunito/v11/XRXX3I6Li01BKofIMOaETM_FcCIG.ttf",
              "600italic": "http://fonts.gstatic.com/s/nunito/v11/XRXQ3I6Li01BKofIMN5cYuvNWz4PDWtj.ttf",
              "700italic": "http://fonts.gstatic.com/s/nunito/v11/XRXQ3I6Li01BKofIMN44Y-vNWz4PDWtj.ttf",
              "800italic": "http://fonts.gstatic.com/s/nunito/v11/XRXQ3I6Li01BKofIMN4kYOvNWz4PDWtj.ttf",
              "900italic": "http://fonts.gstatic.com/s/nunito/v11/XRXQ3I6Li01BKofIMN4AYevNWz4PDWtj.ttf",
            },
            brizyId: "ppzycxqtiwtmjnfpbfluoynrnnfviuerjczz",
          },
          {
            kind: "webfonts#webfont",
            family: "Knewave",
            category: "display",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"],
            version: "v8",
            lastModified: "2019-07-16",
            files: {
              regular: "http://fonts.gstatic.com/s/knewave/v8/sykz-yx0lLcxQaSItSq9-trEvlQ.ttf",
            },
            brizyId: "jojwyelvgkjknbgrosxcdphkpqfcczzdlcen",
          },
          {
            kind: "webfonts#webfont",
            family: "Palanquin",
            category: "sans-serif",
            variants: ["100", "200", "300", "regular", "500", "600", "700"],
            subsets: ["devanagari", "latin", "latin-ext"],
            version: "v5",
            lastModified: "2019-07-16",
            files: {
              100: "http://fonts.gstatic.com/s/palanquin/v5/9XUhlJ90n1fBFg7ceXwUEltI7rWmZzTH.ttf",
              200: "http://fonts.gstatic.com/s/palanquin/v5/9XUilJ90n1fBFg7ceXwUvnpoxJuqbi3ezg.ttf",
              300: "http://fonts.gstatic.com/s/palanquin/v5/9XUilJ90n1fBFg7ceXwU2nloxJuqbi3ezg.ttf",
              500: "http://fonts.gstatic.com/s/palanquin/v5/9XUilJ90n1fBFg7ceXwUgnhoxJuqbi3ezg.ttf",
              600: "http://fonts.gstatic.com/s/palanquin/v5/9XUilJ90n1fBFg7ceXwUrn9oxJuqbi3ezg.ttf",
              700: "http://fonts.gstatic.com/s/palanquin/v5/9XUilJ90n1fBFg7ceXwUyn5oxJuqbi3ezg.ttf",
              regular: "http://fonts.gstatic.com/s/palanquin/v5/9XUnlJ90n1fBFg7ceXwsdlFMzLC2Zw.ttf",
            },
            brizyId: "xnikbaszrjutnnfixmtprduwstoziivqiflp",
          },
          {
            kind: "webfonts#webfont",
            family: "Palanquin Dark",
            category: "sans-serif",
            variants: ["regular", "500", "600", "700"],
            subsets: ["devanagari", "latin", "latin-ext"],
            version: "v6",
            lastModified: "2019-07-16",
            files: {
              500: "http://fonts.gstatic.com/s/palanquindark/v6/xn76YHgl1nqmANMB-26xC7yuF8Z6ZW41fcvN2KT4.ttf",
              600: "http://fonts.gstatic.com/s/palanquindark/v6/xn76YHgl1nqmANMB-26xC7yuF8ZWYm41fcvN2KT4.ttf",
              700: "http://fonts.gstatic.com/s/palanquindark/v6/xn76YHgl1nqmANMB-26xC7yuF8YyY241fcvN2KT4.ttf",
              regular: "http://fonts.gstatic.com/s/palanquindark/v6/xn75YHgl1nqmANMB-26xC7yuF_6OTEo9VtfE.ttf",
            },
            brizyId: "gqzfchsrosvxegeymkyugyofaztsitibprrf",
          },
          {
            kind: "webfonts#webfont",
            family: "Roboto",
            category: "sans-serif",
            variants: [
              "100",
              "100italic",
              "300",
              "300italic",
              "regular",
              "italic",
              "500",
              "500italic",
              "700",
              "700italic",
              "900",
              "900italic",
            ],
            subsets: ["greek-ext", "latin", "cyrillic-ext", "vietnamese", "latin-ext", "greek", "cyrillic"],
            version: "v20",
            lastModified: "2019-07-24",
            files: {
              100: "http://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf",
              300: "http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf",
              500: "http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
              700: "http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
              900: "http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtvAx05IsDqlA.ttf",
              "100italic": "http://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrIzcXLsnzjYk.ttf",
              "300italic": "http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjARc9AMX6lJBP.ttf",
              regular: "http://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
              italic: "http://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf",
              "500italic": "http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ABc9AMX6lJBP.ttf",
              "700italic": "http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBhc9AMX6lJBP.ttf",
              "900italic": "http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBBc9AMX6lJBP.ttf",
            },
            brizyId: "wrqenoprsynrjiyxmfoeuwqddlnomrxemeec",
          },
          {
            kind: "webfonts#webfont",
            family: "Oswald",
            category: "sans-serif",
            variants: ["200", "300", "regular", "500", "600", "700"],
            subsets: ["latin", "cyrillic-ext", "vietnamese", "latin-ext", "cyrillic"],
            version: "v24",
            lastModified: "2019-07-23",
            files: {
              200: "http://fonts.gstatic.com/s/oswald/v24/TK3_WkUHHAIjg75cFRf3bXL8LICs13FvgUFoZAaRliE.ttf",
              300: "http://fonts.gstatic.com/s/oswald/v24/TK3_WkUHHAIjg75cFRf3bXL8LICs169vgUFoZAaRliE.ttf",
              500: "http://fonts.gstatic.com/s/oswald/v24/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvgUFoZAaRliE.ttf",
              600: "http://fonts.gstatic.com/s/oswald/v24/TK3_WkUHHAIjg75cFRf3bXL8LICs1y9ogUFoZAaRliE.ttf",
              700: "http://fonts.gstatic.com/s/oswald/v24/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.ttf",
              regular: "http://fonts.gstatic.com/s/oswald/v24/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf",
            },
            brizyId: "ehiobdhupkijoltxyucnkenojglortpsupmp",
          },
          {
            kind: "webfonts#webfont",
            family: "Oxygen",
            category: "sans-serif",
            variants: ["300", "regular", "700"],
            subsets: ["latin", "latin-ext"],
            version: "v9",
            lastModified: "2019-07-22",
            files: {
              300: "http://fonts.gstatic.com/s/oxygen/v9/2sDcZG1Wl4LcnbuCJW8Db2-4C7wFZQ.ttf",
              700: "http://fonts.gstatic.com/s/oxygen/v9/2sDcZG1Wl4LcnbuCNWgDb2-4C7wFZQ.ttf",
              regular: "http://fonts.gstatic.com/s/oxygen/v9/2sDfZG1Wl4Lcnbu6iUcnZ0SkAg.ttf",
            },
            brizyId: "gzhhqjoyiaozuhrmbylqeknkdaqtxfdynaqt",
          },
          {
            kind: "webfonts#webfont",
            family: "Playfair Display",
            category: "serif",
            variants: ["regular", "italic", "700", "700italic", "900", "900italic"],
            subsets: ["latin", "vietnamese", "latin-ext", "cyrillic"],
            version: "v15",
            lastModified: "2019-07-22",
            files: {
              700: "http://fonts.gstatic.com/s/playfairdisplay/v15/nuFlD-vYSZviVYUb_rj3ij__anPXBYf9pWkU5xxiJKY.ttf",
              900: "http://fonts.gstatic.com/s/playfairdisplay/v15/nuFlD-vYSZviVYUb_rj3ij__anPXBb__pWkU5xxiJKY.ttf",
              regular: "http://fonts.gstatic.com/s/playfairdisplay/v15/nuFiD-vYSZviVYUb_rj3ij__anPXPTvSgWE_-xU.ttf",
              italic: "http://fonts.gstatic.com/s/playfairdisplay/v15/nuFkD-vYSZviVYUb_rj3ij__anPXDTnYhUM66xV7PQ.ttf",
              "700italic":
                "http://fonts.gstatic.com/s/playfairdisplay/v15/nuFnD-vYSZviVYUb_rj3ij__anPXDTngOWwe4z5nNKaV_w.ttf",
              "900italic":
                "http://fonts.gstatic.com/s/playfairdisplay/v15/nuFnD-vYSZviVYUb_rj3ij__anPXDTngAW4e4z5nNKaV_w.ttf",
            },
            brizyId: "bvbbabnggnnjzvtleuwdrnfuvssxrgeovjan",
          },
          {
            kind: "webfonts#webfont",
            family: "Fira Sans",
            category: "sans-serif",
            variants: [
              "100",
              "100italic",
              "200",
              "200italic",
              "300",
              "300italic",
              "regular",
              "italic",
              "500",
              "500italic",
              "600",
              "600italic",
              "700",
              "700italic",
              "800",
              "800italic",
              "900",
              "900italic",
            ],
            subsets: ["greek-ext", "latin", "cyrillic-ext", "vietnamese", "latin-ext", "greek", "cyrillic"],
            version: "v10",
            lastModified: "2019-07-22",
            files: {
              100: "http://fonts.gstatic.com/s/firasans/v10/va9C4kDNxMZdWfMOD5Vn9IjOazP3dUTP.ttf",
              200: "http://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnWKnuQR37fF3Wlg.ttf",
              300: "http://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQR37fF3Wlg.ttf",
              500: "http://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQR37fF3Wlg.ttf",
              600: "http://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnSKzuQR37fF3Wlg.ttf",
              700: "http://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQR37fF3Wlg.ttf",
              800: "http://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQR37fF3Wlg.ttf",
              900: "http://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnFK_uQR37fF3Wlg.ttf",
              "100italic": "http://fonts.gstatic.com/s/firasans/v10/va9A4kDNxMZdWfMOD5VvkrCqYTfVcFTPj0s.ttf",
              "200italic": "http://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrAGQBf_XljGllLX.ttf",
              "300italic": "http://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrBiQxf_XljGllLX.ttf",
              regular: "http://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VfkILKSTbndQ.ttf",
              italic: "http://fonts.gstatic.com/s/firasans/v10/va9C4kDNxMZdWfMOD5VvkojOazP3dUTP.ttf",
              "500italic": "http://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrA6Qhf_XljGllLX.ttf",
              "600italic": "http://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrAWRRf_XljGllLX.ttf",
              "700italic": "http://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrByRBf_XljGllLX.ttf",
              "800italic": "http://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrBuRxf_XljGllLX.ttf",
              "900italic": "http://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrBKRhf_XljGllLX.ttf",
            },
            brizyId: "wndeuiwznzaqgsugjnojbhzjhjwtryegciis",
          },
          {
            kind: "webfonts#webfont",
            family: "Abril Fatface",
            category: "display",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"],
            version: "v11",
            lastModified: "2019-07-17",
            files: {
              regular: "http://fonts.gstatic.com/s/abrilfatface/v11/zOL64pLDlL1D99S8g8PtiKchm-BsjOLhZBY.ttf",
            },
            brizyId: "fbyhozjmiqseimmgxerwiucacmaaljqitrdc",
          },
          {
            kind: "webfonts#webfont",
            family: "Comfortaa",
            category: "display",
            variants: ["300", "regular", "500", "600", "700"],
            subsets: ["latin", "cyrillic-ext", "vietnamese", "latin-ext", "greek", "cyrillic"],
            version: "v23",
            lastModified: "2019-07-17",
            files: {
              300: "http://fonts.gstatic.com/s/comfortaa/v23/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf",
              500: "http://fonts.gstatic.com/s/comfortaa/v23/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4VrMPrQVIT9c2c8.ttf",
              600: "http://fonts.gstatic.com/s/comfortaa/v23/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4bbLPrQVIT9c2c8.ttf",
              700: "http://fonts.gstatic.com/s/comfortaa/v23/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LPrQVIT9c2c8.ttf",
              regular: "http://fonts.gstatic.com/s/comfortaa/v23/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMPrQVIT9c2c8.ttf",
            },
            brizyId: "plspcdzrrelkhthvkmoocpwrtltvuzqcyraw",
          },
          {
            kind: "webfonts#webfont",
            family: "Kaushan Script",
            category: "handwriting",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"],
            version: "v8",
            lastModified: "2019-07-17",
            files: {
              regular: "http://fonts.gstatic.com/s/kaushanscript/v8/vm8vdRfvXFLG3OLnsO15WYS5DF7_ytN3M48a.ttf",
            },
            brizyId: "simpmqjphttgbnwqaobwxuxoavrdlbpdjgzc",
          },
        ],
      },
    },
  },
};

//#region Blocks

const kit = {
  id: "1",
  title: "DefaultKit",
};

const kitType = {
  id: "1",
  name: "base",
  title: "Base kit",
};

const blockMeta = {
  id: "block 1",
  type: kitType.name,
  kitId: kit.id,

  title: "Block 1",
  keywords: "blank",

  thumbnailWidth: 100,
  thumbnailHeight: 100,
  thumbnailSrc: "",

  // These key indicate these block is a blank(no screenshots)
  blank: "blank",

  cat: ["1"],
};

const blockData = {
  id: blockMeta.id,
  data: {
    type: "Section2",
    value: {
      items: [
        {
          type: "Section2Item",
          value: {
            items: [],
          },
        },
      ],
    },
  },
};

const category = {
  id: "1",
  slug: "category",
  name: "category",
  title: "Category #1",
};

const style = {
  id: "1",
  title: "Style #1",
  fontStyles: [],
  colorPalette: [
    {
      id: "color1" as const,
      hex: "#cccccc",
    },
  ],
};

const kitData = {
  id: kit.id,
  blocks: [blockMeta],
  categories: [category],
  types: [kitType],
  name: kit.title,
  styles: [style],
};

const availableKits = [kit];
const availableKitsMeta = [kitData];
const availableBlocksData = [blockData];

//#endregion

//#region Layouts

const layoutCategory = {
  id: "1",
  title: "Category #1",
};

const layoutTemplateMeta = {
  layoutId: "1",
  name: "Layout #1",
  cat: [layoutCategory.id],
  pagesCount: 1,
  keywords: "default",
  thumbnailWidth: 100,
  thumbnailHeight: 100,
  thumbnailSrc: noImage,
  blank: false,
  pro: false,
};

const layoutTemplatePageData = {
  id: layoutTemplateMeta.layoutId,
  data: {
    blocks: [
      {
        type: "Section2",
        blockId: "1",
        value: {
          items: [
            {
              type: "Section2Item",
              value: {
                items: [],
              },
            },
          ],
        },
      },
      {
        type: "Section2",
        blockId: "2",
        value: {
          items: [
            {
              type: "Section2Item",
              value: {
                items: [],
              },
            },
          ],
        },
      },
    ],
  },
};

const layoutTemplatePage = {
  id: layoutTemplatePageData.id,
  title: "Page #1",
  thumbnailWidth: 100,
  thumbnailHeight: 100,
  thumbnailSrc: noImage,
};

const layoutTemplateStyle = {
  id: "1",
  title: "Style #1",
  fontStyles: [],
  colorPalette: [],
};

const layoutTemplatePages = [
  {
    id: layoutTemplateMeta.layoutId,
    pages: [layoutTemplatePage],
    styles: [layoutTemplateStyle],
  },
];

const layoutMeta = {
  categories: [layoutCategory],
  templates: [layoutTemplateMeta],
};

//#endregion

export const config: EditorConfig = {
  ui: {
    leftSidebar: {
      topTabsOrder: [
        {
          id: "addElements",
          type: "addElements",
          elements: [
            {
              label: "Basic",
              moduleNames: ["Row2", "Columns2"],
            },
          ],
        },
        {
          id: "globalStyles",
          type: "globalStyle",
        },
        {
          id: "reorderBlocks",
          type: "reorderBlock",
        },
      ],
    },
  },
  urls: {
    editorIcons: brizyIcons,
  },
  api: {
    media: {
      mediaResizeUrl: "https://cloud-1de12d.b-cdn.net/media",
      imagePatterns: {
        full: "{{ [baseUrl] }}/{{ iW=[iW] }}&{{ iH=[iH] }}&{{ oX=[oX] }}&{{ oY=[oY] }}&{{ cW=[cW] }}&{{ cH=[cH] }}/{{ [uid] }}/{{ [fileName] }}",
        original: "{{ [baseUrl] }}/{{ [sizeType] }}/{{ [uid] }}/{{ [fileName] }}",
        split: "{{ [baseUrl] }}/{{ iW=[iW] }}&{{ iH=[iH] }}/{{ [uid] }}/{{ [fileName] }}",
      },
      addMedia: {
        async handler() {},
      },
    },

    defaultKits: {
      async getKits(res) {
        res(availableKits);
      },
      async getMeta(res, rej, kit) {
        const data = availableKitsMeta.find((k) => k.id === kit.id);

        if (data) {
          res(data);
        } else {
          rej("Fail to find kit");
        }
      },
      async getData(res, rej, block) {
        const { id } = block;
        const blockData = availableBlocksData.find((b) => b.id === id);

        if (blockData) {
          res(blockData.data);
        } else {
          rej(`Fail to find block with id ${id}`);
        }
      },
    },
    defaultLayouts: {
      async getMeta(res) {
        res(layoutMeta);
      },
      async getPages(res, rej, layoutId) {
        const layoutPage = layoutTemplatePages.find((l) => l.id === layoutId);

        if (layoutPage) {
          res(layoutPage);

          rej(`Fail to find layout page ${layoutId}`);
        }
      },
      async getData(res) {
        res(layoutTemplatePageData.data);
      },
    },
  },
};
