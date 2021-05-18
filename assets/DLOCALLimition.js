const commonCard = {
  VI:{ label:'Visa', value:'VI' },
  MC:{ label:'MasterCard', value:'MC'},
  AE:{ label:'American Express', value:'AE'},
  DC:{ label:'Diners', value:'DC'},
  VD:{ label:'Visa Debit', value:'VD' },
  MD:{ label:'Mastercard Debit', value:'MD'},
}
export default [
  {
    // 阿根廷
    countryCode:'AR',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.AE,
      commonCard.DC,
      commonCard.VD,
      commonCard.MD,
      {
        label:'CMR Falabella',
        value:'CM',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/CM.png'
      },
      {
        label:'Tarjeta Naranja',
        value:'NJ',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/NJ.png'
      },
      {
        label:'Tarjeta Shopping',
        value:'TS',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/TS.png'
      },
      {
        label:'Nativa',
        value:'NT',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/NT.png'
      },
      {
        label:'Cencosud',
        value:'CS',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/CS.png'
      },
      {
        label:'Cabal',
        value:'CL',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/CL.png'
      },
      {
        label:'Argencard',
        value:'AG',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/AG.png'
      },
      {
        label:'Maestro Debit',
        value:'MS',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/MS.png'
      },
      {
        label:'Cordial',
        value:'CO',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/CO.png'
      },
      {
        label:'Cordobesa',
        value:'CB',
        icon:'https://pay.dlocal.com/views/2.0/images/payments/CB.png'
      }
    ],
    tickets:[
      {
        label:'Pago Fácil',
        value:'PF'
      },
      {
        label:'Rapi Pago',
        value:'RP'
      },
    ],
    bankTransferList:[
      {
        label:'Santander Rio',
        value:'SI'
      }
    ]
  },
  {
    //玻利维亚
    countryCode:'BO',
    allow:false,
    bank:[
      {
        label:'Banco Nacional de Bolivia',
        value:'IO'
      }
    ]
  },
  {
    //巴西
    countryCode:'BR',
    allow:true,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.AE,
      {
        label:'Elo',
        value:'EL'
      },
      {
        label:'Hipercard',
        value:'HI'
      },
      {
        label:'Cartao MercadoLivre',
        value:'ML'
      },
      {
        label:'JCB',
        value:'JC'
      },
      {
        label:'Aura',
        value:'AU'
      },
      {
        label:'Discover',
        value:'DI'
      }
    ],
    tickets:[
      {
        label:'Boleto',
        value:'BL'
      },
      // {
      //   label:'Whatsapp',
      //   value:'WH'
      // }
    ],
    bankTransferList:[
      {
        label:'Itau',
        value:'I'
      },
      {
        label:'Bradesco',
        value:'B'
      },
      {
        label:'Banco do Brasil',
        value:'BB'
      },
      {
        label:'Caixa',
        value:'CA'
      },
      {
        label:'Santander',
        value:'SB'
      }
    ]
  },
  {
    //智利
    countryCode:'CL',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.AE,
      {
        label:'Diners Club',
        value:'DC'
      },
      {
        label:'Presto',
        value:'PR'
      },
      {
        label:'CMR',
        value:'CM'
      },
      {
        label:'Magna',
        value:'MG'
      }
    ],
    tickets:[
      {
        label:'Servipag',
        value:'SP'
      }
    ],
    bankTransferList:[
      {
        label:'WebPay',
        value:'WP'
      },
      {
        label:'BBVA',
        value:'WP'
      },
      {
        label:'Santander',
        value:'WP'
      },
      {
        label:'ITAU',
        value:'WP'
      },
      {
        label:'Corpbanca',
        value:'WP'
      },
      {
        label:'BCI-TBANC',
        value:'WP'
      },
      {
        label:'Banco Falabella',
        value:'WP'
      },
      {
        label:'Banco Estado',
        value:'WP'
      },
      {
        label:'Banco Bice',
        value:'WP'
      },
      {
        label:'Banco Security',
        value:'WP'
      },
      {
        label:'Banco Consorcio',
        value:'WP'
      },
      {
        label:'Banco Ripley',
        value:'WP'
      },
      {
        label:'ScotiaBank',
        value:'WP'
      },
      {
        label:'Coopeuch',
        value:'WP'
      },
    ]
  },
  {
    //中国
    countryCode:'CN',
    allow:false,
    bankTransferList:[
      {
        label:'ePayLinks',
        value:'EE'
      },
      {
        label:'China Union Pay',
        value:'UP'
      }
    ]
  },
  {
    //哥伦比亚
    countryCode:'CO',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.VD,
      commonCard.MD,
      {
        label:'Amex',
        value:'AE'
      },
      {
        label:'Diners',
        value:'DC'
      }
    ],
    tickets:[
      {
        label:'Efecty',
        value:'EY'
      },
      {
        label:'Davivienda',
        value:'DA'
      },
      {
        label:'Baloto',
        value:'BU'
      },
      {
        label:'Baloto',
        value:'BU'
      },
    ],
    bankTransferList:[
      {
        label:'PSE',
        value:'PC'
      },
      {
        label:'Banco Agrario',
        value:'PC'
      },
      {
        label:'Banco Av Villas',
        value:'PC'
      },
      {
        label:'Banco Colpatria',
        value:'PC'
      },
      {
        label:'Banco Corpbanca S.A.',
        value:'PC'
      },
      {
        label:'Banco de Bogota',
        value:'PC'
      },
      {
        label:'Banco de Occidente',
        value:'PC'
      },
      {
        label:'Banco GNB Sudameris',
        value:'PC'
      },
      {
        label:'Banco Pichincha S.A.',
        value:'PC'
      },
      {
        label:'Banco Popular',
        value:'PC'
      },
      {
        label:'Banco Procredit',
        value:'PC'
      },
      {
        label:'Bancolombia',
        value:'PC'
      },
      {
        label:'Bancoomeva S.A.',
        value:'PC'
      },
      {
        label:'BBVA Colombia S.A.',
        value:'PC'
      },
      {
        label:'Citibank',
        value:'PC'
      },
      {
        label:'Helm Bank S.A.',
        value:'PC'
      },
      {
        label:'Banco Falabella',
        value:'PC'
      }
    ]
  },
  {
    //厄瓜多尔
    countryCode:'EC',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC
    ],
    tickets:[
      {
        label:'Pago Efectivo',
        value:'EF'
      }
    ]
  },
  {
    //埃及
    countryCode:'EG',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC
    ],
    tickets:[
      {
        label:'Fawry',
        value:'FW'
      }
    ]
  },
  {
    //印度
    countryCode:'IN',
    allow:true,
    cardBrands:[
      // commonCard.VI,
      // commonCard.MC,
      // commonCard.VD,
      // commonCard.MD,
      // commonCard.AE
    ],
    bankTransferList:[
      {
        label:'PayTM Wallet',
        value:'PW'
      },
      {
        label:'Netbanking',
        value:'NB'
      },
      {
        label:'UPI',
        value:'UI'
      },
    ]
  },
  {
    //印尼
    countryCode:'ID',
    allow:true,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.AE,
      {
        label:'JCB',
        value:'JC'
      },
    ],
    tickets:[
      {
        label:'Cash',
        value:'RO'
      }
    ],
    bankTransferList:[
      {
        label:'Bank Transfer',
        value:'VS'
      },
      {
        label:'Wallet',
        value:'XW'
      },
    ]
  },
  {
    //墨西哥
    countryCode:'MX',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.VD,
      commonCard.MD,
      commonCard.AE
    ],
    tickets:[
      {
        label:'OXXO',
        value:'OX'
      }
    ],
    bankTransferList:[
      {
        label:'SPEI',
        value:'SE'
      },
      {
        label:'BBVA Bancomer',
        value:'BV'
      },
      {
        label:'Banorte',
        value:'BQ'
      },
      {
        label:'Santander',
        value:'SM'
      },
    ]
  },
  {
    //摩洛哥
    countryCode:'MA',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      {
        label:'CMI',
        value:'MI'
      }
    ],
    tickets:[
      {
        label:'Chaabi Cash / Tasshila',
        value:'AM'
      }
    ]
  },
  {
    //尼日利亚
    countryCode:'NG',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.VD,
      commonCard.MD,
      {
        label:'Verve',
        value:'VE'
      }
    ]
  },
  {
    //巴拉圭
    countryCode:'PY',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.AE
    ],
    tickets:[
      {
        label:'PagoExpress',
        value:'PE'
      }
    ],
    
  },
  {
    //秘鲁
    countryCode:'PE',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      commonCard.AE,
      commonCard.VD,
      {
        label:'Diners Club',
        value:'DC'
      }
    ],
    tickets:[
      {
        label:'Pago Efectivo',
        value:'EF'
      }
    ],
    bankTransferList:[
      {
        label:'BCP',
        value:'BC'
      },
      {
        label:'Interbank',
        value:'IB'
      },
      {
        label:'BBVA',
        value:'BP'
      },
    ]
  },
  {
    //南非
    countryCode:'ZA',
    allow:true,
    cardBrands:[
      commonCard.VI,
      commonCard.MC
    ],
    bankTransferList:[
      {
        label:'ACH',
        value:'IO'
      }
    ]
  },
  {
    //土耳其
    countryCode:'TR',
    allow:false,
    // cardBrands:[
    //   commonCard.VI,
    //   commonCard.MC,
    //   {
    //     label:'Amex',
    //     value:'AE'
    //   },
    //   {
    //     label:'Troy',
    //     value:'OT'
    //   },
    // ]
  },
  {
    
    //乌拉圭
    countryCode:'UY',
    allow:false,
    cardBrands:[
      commonCard.VI,
      commonCard.MC,
      {
        label:'Diners Club',
        value:'DC'
      },
      {
        label:'OCA',
        value:'OA'
      },
      {
        label:'Lider',
        value:'LI'
      },
    ],
    tickets:[
      {
        label:'Red Pagos',
        value:'RE'
      },
      {
        label:'Abitab',
        value:'AI'
      }
    ]
  }
]
