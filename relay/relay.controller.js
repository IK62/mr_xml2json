const md5 = require('md5')
const {xml2json} = require('xml-js')
const {default: axios} = require('axios')

const BASE_URL = 'https://api.mondialrelay.com/Web_Services.asmx'
const xml2jsonConfig = {
  compact: true,
  ignoreDeclaration: true,
  ignoreAttributes: true,
  trim: true,
}
const headersConfig = { headers: { 'Content-Type': 'text/xml' } }

module.exports = {
    createLabel: async (req, res) => {
        const { data } = await axios.post(
            BASE_URL,
            `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">
                    <Enseigne>${req.body || ''}</Enseigne>
                    <ModeCol>${req.body || ''}</ModeCol>
                    <ModeLiv>${req.body || ''}</ModeLiv>
                    <NDossier>${req.body || ''}</NDossier>
                    <NClient>${req.body || ''}</NClient>
                    <Expe_Langage>${req.body || ''}</Expe_Langage>
                    <Expe_Ad1>${req.body || ''}</Expe_Ad1>
                    <Expe_Ad2>${req.body || ''}</Expe_Ad2>
                    <Expe_Ad3>${req.body || ''}</Expe_Ad3>
                    <Expe_Ad4>${req.body || ''}</Expe_Ad4>
                    <Expe_Ville>${req.body || ''}</Expe_Ville>
                    <Expe_CP>${req.body || ''}</Expe_CP>
                    <Expe_Pays>${req.body || ''}</Expe_Pays>
                    <Expe_Tel1>${req.body || ''}</Expe_Tel1>
                    <Expe_Tel2>${req.body || ''}</Expe_Tel2>
                    <Expe_Mail>${req.body || ''}</Expe_Mail>
                    <Dest_Langage>${req.body || ''}</Dest_Langage>
                    <Dest_Ad1>${req.body || ''}</Dest_Ad1>
                    <Dest_Ad2>${req.body || ''}</Dest_Ad2>
                    <Dest_Ad3>${req.body || ''}</Dest_Ad3>
                    <Dest_Ad4>${req.body || ''}</Dest_Ad4>
                    <Dest_Ville>${req.body || ''}</Dest_Ville>
                    <Dest_CP>${req.body || ''}</Dest_CP>
                    <Dest_Pays>${req.body || ''}</Dest_Pays>
                    <Dest_Tel1>${req.body || ''}</Dest_Tel1>
                    <Dest_Tel2>${req.body || ''}</Dest_Tel2>
                    <Dest_Mail>${req.body || ''}</Dest_Mail>
                    <Poids>${req.body || ''}</Poids>
                    <Longueur>${req.body || ''}</Longueur>
                    <Taille>${req.body || ''}</Taille>
                    <NbColis>${req.body || ''}</NbColis>
                    <CRT_Valeur>${req.body || ''}</CRT_Valeur>
                    <CRT_Devise>${req.body || ''}</CRT_Devise>
                    <Exp_Valeur>${req.body || ''}</Exp_Valeur>
                    <Exp_Devise>${req.body || ''}</Exp_Devise>
                    <COL_Rel_Pays>${req.body || ''}</COL_Rel_Pays>
                    <COL_Rel>${req.body || ''}</COL_Rel>
                    <LIV_Rel_Pays>${req.body || ''}</LIV_Rel_Pays>
                    <LIV_Rel>${req.body || ''}</LIV_Rel>
                    <TAvisage>${req.body || ''}</TAvisage>
                    <TReprise>${req.body || ''}</TReprise>
                    <Montage>${req.body || ''}</Montage>
                    <TRDV>${req.body || ''}</TRDV>
                    <Assurance>${req.body || ''}</Assurance>
                    <Instructions>${req.body || ''}</Instructions>
                    <Security>${req.body || ''}</Security>
                    <Texte>${req.body || ''}</Texte>
                    </WSI2_CreationEtiquette>
                </soap:Body>
            </soap:Envelope>`,
            headersConfig
        )
        res.send(xml2json(data, xml2jsonConfig))
    },
    searchRelay: async (req, res) => {
      const {
        Enseigne,
        Pays,
        NumPointRelay,
        Ville,
        CP,
        latitude,
        longitude,
        Taille,
        Poids,
        Action,
        DelaiEnvoie,
        RayonRecherche,
        TypeActivite,
        NACE,
        privateKey,
      } = req.body

      const security = md5(
        `${Enseigne || ''}${Pays || ''}${NumPointRelay || ''}${Ville || ''}${
          CP || ''
        }${latitude || ''}${longitude || ''}${Taille || ''}${Poids || ''}${
          Action || ''
        }${DelaiEnvoie || ''}${RayonRecherche || ''}${TypeActivite || ''}${
          NACE || ''
        }${privateKey || ''}`
      ).toUpperCase()

      const { data } = await axios.post(
        BASE_URL,
        `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <WSI3_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
                    <Enseigne>${Enseigne || ''}</Enseigne>
                    <Pays>${Pays || ''}</Pays>
                    <NumPointRelais>${NumPointRelay || ''}</NumPointRelais>
                    <Ville>${Ville || ''}</Ville>
                    <CP>${CP || ''}</CP>
                    <Latitude>${latitude || ''}</Latitude>
                    <Longitude>${longitude || ''}</Longitude>
                    <Taille>${Taille || ''}</Taille>
                    <Poids>${Poids || ''}</Poids>
                    <Action>${Action || ''}</Action>
                    <DelaiEnvoi>${DelaiEnvoie || ''}</DelaiEnvoi>
                    <RayonRecherche>${RayonRecherche || ''}</RayonRecherche>
                    <TypeActivite>${TypeActivite || ''}</TypeActivite>
                    <NACE>${NACE || ''}</NACE>
                    <Security>${security}</Security>
                    </WSI3_PointRelais_Recherche>
                </soap:Body>
            </soap:Envelope>`,
        headersConfig
      )

      let {
        'soap:Envelope': {
          'soap:Body': {
            WSI3_PointRelais_RechercheResponse: {
              WSI3_PointRelais_RechercheResult: {
                PointsRelais: { PointRelais_Details: newData },
              },
            },
          },
        },
      } = JSON.parse(xml2json(data, xml2jsonConfig))

      Object.entries(newData).forEach((element) => {
        Object.entries(element[1]).forEach((element1) => {
          if (Object.keys(element1[1])[0] === '_text') {
            const text = element1[1]._text
            newData[element[0]][element1[0]] = text
          } else if (element1[1].string) {
            let schedule = []
            Object.values(element1[1].string).forEach((time) => {
              if (time._text === '0000') {
              } else {
                let newTime = Object.values(time)[0]
                newTime = [
                  newTime.slice(0, 2),
                  'h',
                  newTime.slice(2),
                  'm',
                ].join('')
                schedule.push(newTime)
              }
            })
            if (schedule[0] === undefined) {
              newData[element[0]][element1[0]] = 'Fermé'
            } else {
              newData[element[0]][element1[0]] = schedule
            }
            schedule = []
          }
        })
      })

      res.send(newData)
    }
}