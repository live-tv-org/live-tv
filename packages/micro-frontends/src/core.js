const fetchManifest = (name, host) => {
  // console.info('fetchManifest')

  return fetch(`${host}/asset-manifest.json`)
    .then(res => res.json(), () => {
      throw new Error('Not loaded asset-manifest.json');
    })
}

const loadScript = (host, manifest) => new Promise((res, rej) => {
  // console.info('loadScript')

  const script = document.createElement('script')
  script.id = manifest.name
  script.src = `${host}${manifest.files['main.js']}`
  script.onload = () => res()
  script.onerror = () => rej()
  document.head.appendChild(script)
})

const render = (name) => {
  // console.info('render')

  const nameFunc = `${name}Render`
  const cont = document.getElementById(name)
  if (!cont) {
    throw new Error(`The "${name}" micro frontend do not have a container.`)
  }

  window[nameFunc](cont)
}

const unmount = (name) => {
  // console.info('unmount')
  const nameFunc = `${name}Unmount`
  typeof window[nameFunc] === 'function' ? window[nameFunc]() : new Error(`The "${name}" micro frontend was not unmounted.`)
}

export default (name, host) => {
  let loaded

  return {
    bootstrap: () => {
      loaded = new Promise((res, rej) => {
        fetchManifest(name, host)
          .then(manifest => {
            return loadScript(host, manifest)
              .then(() => {
                const nameFunc = `${name}Render`
                if (typeof window[nameFunc] !== 'function') {
                  throw new Error(`The "${name}" micro frontend was not bootstrapped.`)
                }

                res()
              })
          })
          .catch(error => {
            console.log(error)
            rej()
          })
      })

      return loaded
    },

    render: () => {
      // console.info('go render');

      if (!loaded) {
        new Error(`The "${name}" micro frontend was not mounted before bootstrapping.`)
      }

      loaded
        .then(() => render(name))
        .catch(error => {
          console.error(error)
        })
    },

    unmount: () => {
      if (!loaded) {
        new Error(`The "${name}" micro frontend was not unmounted before bootstrapping.`)
      }
      loaded.then(() => unmount(name))
      // loaded = null
    }
  }
}
