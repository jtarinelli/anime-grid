import { ClueOption, ClueType } from "./types";

const clueOptions: Record<ClueType, ClueOption[]> = {
    [ClueType.EPISODES]: [
        { value: { max: 13 }, noGos: [{ type: ClueType.FORMAT, value: "MOVIE" }, { type: ClueType.STUDIO, value: "Studio Ghibli" }] },
        { value: { min: 20 }, noGos: [{ type: ClueType.FORMAT, value: "MOVIE" }, { type: ClueType.STUDIO, value: "Studio Ghibli" }] },
    ],
    [ClueType.GENRE]: [
        { value: "Action", },
        { value: "Romance", },
        { value: "Sports", }, // may not go with some studios or even female VAs ( :( )
        { value: "Slice of Life", },
        { value: "Drama", },
        { value: "Fantasy", },
        { value: "Comedy", },
        { value: "Music", },
    ],
    [ClueType.STUDIO]: [
        { value: "Trigger", yearsActive: { min: 2012 } },
        { value: "Production I.G", yearsActive: { min: 1987 } },
        { value: "bones", yearsActive: { min: 2000 } },
        { value: "Kyoto Animation", yearsActive: { min: 2003 } },
        { value: "MADHOUSE", yearsActive: { min: 1973 } },
        { value: "MAPPA", yearsActive: { min: 2012 } },
        { value: "Shaft", yearsActive: { min: 1995 } },
        { value: "Studio Ghibli", yearsActive: { min: 1986 } },
        { value: "Gainax", yearsActive: { min: 1981, max: 2015 } },
        { value: "A-1 Pictures", yearsActive: { min: 2006 } },
        { value: "P.A. Works", yearsActive: { min: 2008 } },
        { value: "Sunrise", yearsActive: { min: 1972 }},
        { value: "Toei Animation", yearsActive: { min: 1957 } },
    ],
    [ClueType.VOICE_ACTOR]: [
        { value: "Yuuki Kaji", yearsActive: { min: 2004 } },
        { value: "Kenjirou Tsuda", yearsActive: { min: 1995 } },
        { value: "Mamoru Miyano", yearsActive: { min: 2001 } },
        { value: "Tomokazu Sugita", yearsActive: { min: 2000 } },
        { value: "Yuuichi Nakamura", yearsActive: { min: 2001 } },
        { value: "Yoshimasa Hosoya", yearsActive: { min: 2004 } },
        { value: "Daisuke Ono", yearsActive: { min: 2001 } },
        { value: "Kenshou Ono", yearsActive: { min: 2001 } },
        { value: "Saori Hayami", yearsActive: { min: 2007 } },
        { value: "Kana Hanazawa", yearsActive: { min: 2003 } },
        { value: "Miyuki Sawashiro", yearsActive: { min: 1999 } },
        { value: "Takehito Koyasu", yearsActive: { min: 1988 } },
        { value: "Natsuki Hanae", yearsActive: { min: 2011 } },
        { value: "Hiroshi Kamiya", yearsActive: { min: 1994 } },
        { value: "Rie Takahashi", yearsActive: { min: 2013 } },
        { value: "Nobuhiko Okamoto", yearsActive: { min: 2006 } },
        { value: "Aoi Yuuki", yearsActive: { min: 2003 } },
        { value: "Yoshitsugu Matsuoka", yearsActive: { min: 2011 } },
        { value: "Junichi Suwabe", yearsActive: { min: 1995 } },
        { value: "Kouki Uchiyama", yearsActive: { min: 2003 } },
        { value: "Nobunaga Shimazaki", yearsActive: { min: 2010 } },
        { value: "Yuuma Uchida", yearsActive: { min: 2012 } },
        { value: "Maaya Uchida", yearsActive: { min: 2010 } },
        { value: "Jun Fukuyama", yearsActive: { min: 2000 } },
        { value: "Takahiro Sakurai", yearsActive: { min: 1996 } },
        { value: "Kaito Ishikawa", yearsActive: { min: 2010 } },
        { value: "Kouki Uchiyama", yearsActive: { min: 2003 } },
        { value: "Ryouhei Kimura", yearsActive: { min: 2002 } },
        { value: "Atsumi Tanezaki", yearsActive: { min: 2008 } },
        { value: "Ai Kayano", yearsActive: { min: 2010 } },
        { value: "Akira Ishida", yearsActive: { min: 1989 } },
        { value: "Megumi Ogata", yearsActive: { min: 1992 } },
        { value: "Yuuki Ono", yearsActive: { min: 2006 } },
        { value: "Hiro Shimono", yearsActive: { min: 2001 } },
        { value: "Romi Park", yearsActive: { min: 1997 } },
        { value: "Jouji Nakata", yearsActive: { min: 1988 } },
        { value: "Akio Ootsuka", yearsActive: { min: 1988 } },
        { value: "Shinichirou Miki", yearsActive: { min: 1989 } }
    ],
    [ClueType.YEAR]: [
        { value: { max: 2020 }, },
        { value: { max: 2010 }, },
        { value: { max: 2000 }, }, // this will not work with most popular voice actors...
        // also some studios (mappa, trigger are new)
        { value: { min: 2010 }, },
    ],
    [ClueType.WORDS_IN_TITLE]: [
        { value: { number: 1 }, },
        { value: { min: 3 }, },
        { value: { max: 3 }, },
    ],
    [ClueType.TAG]: [
        { value: "Shoujo", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" },{ type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Josei" }, ] },
        { value: "Shounen", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shoujo" },{ type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Josei" },] },
        { value: "Josei", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" },{ type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Shoujo" },] },
        { value: "Seinen", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" },{ type: ClueType.TAG, value: "Shoujo" }, { type: ClueType.TAG, value: "Josei" },] },
    ],
    [ClueType.FORMAT]: [
        { value: "MOVIE", },
    ],
    [ClueType.SOURCE]: [
        { value: "ORIGINAL", },
    ],
}

export default clueOptions;