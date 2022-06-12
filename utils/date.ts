import pad from 'left-pad' // always wanted to install this

type RawDate = string | number

const parseRawDate = (value: RawDate) => {
  const arr = value.toString().split('T')[0].split('-').map(Number)
  return {
    year: arr[0],
    month: arr[1],
    day: arr[2],
  }
}

const getDate = (raw?: RawDate): Date => {
  if (raw) {
    const parsed = parseRawDate(raw)
    return new Date(parsed.year, parsed.month || 0)
  }
  return new Date(Date.now())
}

export const getDateDiff = (from?: RawDate, to?: RawDate) => {
  const dateFrom = getDate(from)
  const dateTo = getDate(to)

  const diff = (
    (dateTo.getFullYear() * 12 + dateTo.getMonth())
    -
    (dateFrom.getFullYear() * 12 + dateFrom.getMonth())
  )

  const diffMonths = diff % 12
  const diffYears = Math.floor(diff / 12)

  return {
    diffMonths,
    diffYears
  }
}

export const formatDate = (value: string | number | Date) => {
  let parsedValue
  if (typeof value === 'string' || typeof value === 'number') {
    parsedValue = parseRawDate(value)
  } else {
    parsedValue = {
      month: value.getMonth() + 1,
      year: value.getFullYear(),
      day: value.getDate(),
    }
  }

  const res: string[] = [parsedValue.year.toString()]

  if (parsedValue.month !== undefined) {
    res.push(pad(parsedValue.month, 2, '0'))
  }

  if (parsedValue.day !== undefined) {
    res.push(pad(parsedValue.day, 2, '0'))
  }

  return res.reverse().join('.')
}