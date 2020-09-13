export default class VideosStore {
  videos = []

  constructor(transportLayer) {
    this.transportLayer = transportLayer
  }

  async fetch(params) {
    const { data } = await this.transportLayer.all(params)
    this.videos = data
    return data
  }
}