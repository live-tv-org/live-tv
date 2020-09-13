import { Component } from 'preact'
import { StoreContext } from './stores/context'
import { withStoreContext } from './utils/hoc'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: []
    }
  }

  async componentDidMount() {
    const { videosStore } = this.props
    console.log(videosStore)
    const videos = await videosStore.fetch({ part: 'contentDetails,liveStreamingDetails,snippet,player,recordingDetails,statistics,topicDetails,status', chart: 'mostPopular' })
    this.setState({ videos })
  }

  createPlayer = html => ({ __html: html })

  render({ }, { videos }) {
    return (
      <ul>
        {videos.map(video => <li key={video.id}>
		  {video.snippet.title}
          <div dangerouslySetInnerHTML={this.createPlayer(video.player.embedHtml)} />
        </li>)}
      </ul>
    );
  }
}

export default withStoreContext(StoreContext)(App)