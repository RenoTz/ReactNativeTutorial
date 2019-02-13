import React from 'react'
import { ActivityIndicator, Image, Text, ScrollView, StyleSheet, View } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi, getGenres, getCompagnies } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

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
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
    }
    

    _displayFilm() {
        if (this.state.film != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
              <Image
                style={styles.image}
                source={{uri: getImageFromApi(this.state.film.backdrop_path)}}
              />
              <View style={styles.content_container}>
                <View style={styles.header_container}>
                    <Text style={styles.title_text}>{this.state.film.title}</Text>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.description_text} numberOfLines={24}>{this.state.film.overview}</Text>
                </View>
                <View style={styles.infos_sup_container}>
                  <Text style={styles.infos_sup_text}>Sorti le {moment(new Date(this.state.film.release_date)).format('DD/MM/YYYY')}</Text>
                  <Text style={styles.infos_sup_text}>Note : {this.state.film.vote_average}</Text>
                  <Text style={styles.infos_sup_text}>Nombre de votes : {this.state.film.vote_count}</Text>
                  <Text style={styles.infos_sup_text}>Budget : {numeral(this.state.film.budget).format('0,0[.]00 $')}</Text>
                  <Text style={styles.infos_sup_text}>Genre(s) : {this.state.film.genres.map(function(genre){
                      return genre.name;
                    }).join(" / ")}
                  </Text>
                  <Text style={styles.infos_sup_text}>Companie(s) : {this.state.film.production_companies.map(function(company){
                      return company.name;
                    }).join(" / ")}
                  </Text>
                </View>
              </View>
            </ScrollView>
          )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm')).then(data => {
            this.setState({
              film: data,
              isLoading: false
            })
        })
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  image: {
    width: 'auto',
    height: 150,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 26,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  description_container: {
    flex: 1,
    marginTop: 10
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  infos_sup_container: {
    flex: 1,
    marginTop: 10
  },
  infos_sup_text: {
    textAlign: 'left',
    fontSize: 14
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