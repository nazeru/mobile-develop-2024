import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        display: 'flex',
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      },
    button: {
        top:-40,
        elevation:6,
        height: 80,
        width: 280,
        backgroundColor: 'white',
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttontext: {
        color: 'black',
        fontSize: 20
      },
      image: {
        top:-90,
        width: 300, 
        height: 300,  
        borderRadius: 50
      },
      header:{
        top:-160,
        elevation:16,
        backgroundColor:"white",
        height:"20%",
        borderBottomLeftRadius:80,
        borderBottomRightRadius:80,
        paddingHorizontal:6,
        flexDirection:"row",
        alignItems:"center"
      },
      text:{
        top:20,
        left:135,
        fontSize:30,
        color:"orange",
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontWeight:"bold",
     }
})