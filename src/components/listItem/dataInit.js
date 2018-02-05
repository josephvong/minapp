export function txtItemDataInit(data){
  let baseData = {}
  baseData.wine_id = data.wine_id
  baseData.sign = data.sign
  baseData.pic_url = data.pic_url
  baseData.name_ch = data.name.name_ch
  baseData.name_en = data.name.name_en
  baseData.country =  data.country.name_ch
  baseData.region =  data.region.name_ch
  baseData.sub_region = data.sub_region.name_ch
  baseData.year = data.year

  return baseData
}

export function imgItemDataInit(data){
  let baseData = {}
  baseData.wine_id = data.wine_id
  baseData.sign = data.sign
  baseData.pic_url = data.pic_url
  baseData.name_ch = data.name
  baseData.name_en = data.name_en
  baseData.country =  data.country_ch
  baseData.region =  data.region_ch||''
  baseData.sub_region = data.sub_region_ch||''
  baseData.year = data.wyear

  return baseData
  
}