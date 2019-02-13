import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' />
            </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
            </View>
        )
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm')).then(data => {
            this.setState({
              film: data,
              isLoading: false
            })
            console.log(this.state.film)
        })
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default FilmDetail