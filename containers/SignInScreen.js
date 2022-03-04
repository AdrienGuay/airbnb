import { useNavigation } from "@react-navigation/core";
import {
  StatusBar,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { useState } from "react";

export default function SignInScreen({ setToken }) {
  // Navigation
  const navigation = useNavigation();

  // State name, password
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Chargement
  const [isLoading, setIsLoading] = useState("");

  return (
    <View style={{ backgroundColor: "#FF5A5F", flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Image
          source={require("../assets/img/airbnb-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        {/* formulaire */}
        <View style={{ alignItems: "center" }}>
          <TextInput
            // Bouton Name
            placeholder="Name"
            style={styles.input}
            //////
            value={name}
            onChangeText={(value) => {
              setName(value);
            }}
          />
        </View>
        {/* <Text>Password: </Text> */}
        <View style={{ alignItems: "center" }}>
          <TextInput
            // Bouton Password
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            //////
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          {isLoading === true ? (
            <Text>Chargement...</Text>
          ) : (
            // <ActivityIndicator></ActivityIndicator>
            <TouchableOpacity
              style={styles.connect}
              const
              userToken="secret-token"
              onPress={async () => {
                setIsLoading(true);
                try {
                  const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    {
                      name: name,
                      password: password,
                    }
                  );

                  console.log(response.data);
                  setIsLoading(false);
                  setToken(userToken);
                } catch (error) {
                  console.log("error =>", response.data);
                }
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  marginBottom: 20,
                }}
              >
                Se connecter
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Si pas de compte */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Text
            style={{
              color: "white",
              marginBottom: 5,
            }}
          >
            Vous n'avez pas encore de compte ?
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={styles.compte}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

///////////////////////////

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 300,
  },

  input: {
    height: 50,
    width: 300,
    backgroundColor: "white",
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 25,
  },

  connect: {
    alignItems: "center",
    justifyContent: "center",
  },

  compte: {
    color: "white",
    backgroundColor: "white",
    width: 160,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
