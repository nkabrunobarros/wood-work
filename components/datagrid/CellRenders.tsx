import * as moment from 'moment'
import { Translate } from 'next-translate'

export const dateCellRender = (v: string) => { return v ? moment.default(v).utc().format(process.env.NEXT_PUBLIC_DATE_FORMAT) : '' }

export const booleanCellRender = (v: string, t: Translate) => { return v ? t('sim') : t('nao') }

export const grandezaCellRender = (v: string, t: Translate) => { return t(v.toLowerCase()) }
