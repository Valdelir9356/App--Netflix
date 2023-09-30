import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from "react-native"

const FilmesScreen =()=>{
    //Array de filmes
const[filmes,setFilmes]= useState([])

const navigation=useNavigation();


useEffect(()=>{///o UsoEFFECT ELE dispara efeito apos a mudanca de um estado

    axios
        .get('https://api.themoviedb.org/3/discover/movie?api_key=614fd2a9af2c92e4ac454c744cfc723c&language=en-US&sort_by=popularity.desc&page=1')
                .then((response)=>{
                    setFilmes(response.data.results)
                })
                    .catch((error)=>{
                       Alert.alert(error)
                    })


    
    },[]) 

    return(
        <View style={styles.container}>
           
                    <FlatList
                        data={filmes}
                        keyExstractor={(item)=> item.id.toString}
                            renderItem={({ item})=>(

                      <View style={styles.filmeConteiner}> 
                        < Image 
                        style={styles.poster}
                        source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
                      />
                      <Text style={styles.tituloFilme}>{item.title}</Text>
                      <Text style={styles.resumoFilme}>{item.overview}</Text>
                                <Button 
                                title="Saiba mais"
                                onPress={()=>{

                                    navigation.navigate(`DetalhesFilme`,{filme: item })
                                }} 
                                    color="#E50915"

                                />

                      </View>


                            )}

                    
                    
                    /> 
        </View>
    )


}

const styles =StyleSheet.create({
    container:{
        flex: 1,
        padding:20,
        backgroundColor:"green",
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom :16, 
        backgroundColor:"#e50914",
        textAlign:"center",
        color:"white",
        paddingVertical: 10

    },

    filmeConteiner:{
        borderWidth: 1,
        borderColor: "ccc",
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        backgroundColor: "black"

    },
    poster :{
        width :200,
        height :300,
        resizeMode: "cover",
        marginBottom:8
    },

    tituloFilme: {
        fontSize: 18,
        fontWeight:"bold",
        color: "white"
    },
    resumoFilme:{
        fontSize: 16,
        color: "white"
    }


    

  

    


    

})
export default FilmesScreen