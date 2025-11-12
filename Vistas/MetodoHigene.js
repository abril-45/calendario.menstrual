import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function MetodosAnticon({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Diferentes métodos Anticonpectivos </Text>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                  <Text style={styles.label}>Metodos hormonales:</Text>
                  <Text style={styles.text}>
                Actúan liberando hormonas (estrógeno y/o progestágeno) que evitan la ovulación o alteran el moco cervical.{"\n"}{"\n"}
                Combinados (estrógeno + progestina){"\n"}
                • Píldora anticonceptiva: se toma una diaria; regula el ciclo menstrual.{"\n"}
                • Parche transdérmico: se cambia semanalmente; libera hormonas por la piel.{"\n"}
                • Anillo vaginal: se coloca en la vagina 3 semanas y se retira 1 semana.{"\n"}{"\n"}
                Solo progestina{"\n"}{"\n"}
                • Píldora de solo progestina (minipíldora): adecuada durante la lactancia.{"\n"}
                • Implante subdérmico: varilla que se coloca bajo la piel del brazo, dura 3–5 años.{"\n"}
                • Inyección anticonceptiva: se aplica cada 1 o 3 meses.{"\n"}
                  </Text>
        
                  <Text style={styles.label}> Métodos intrauterinos (DIU o SIU):</Text>
                  <Text style={styles.text}>
                     Se colocan dentro del útero y evitan la fecundación{"\n"}{"\n"}
                    • DIU de cobre: no contiene hormonas; dura de 5 a 10 años.{"\n"}
                    • SIU (sistema intrauterino hormonal): libera progestina; dura 3 a 8 años.{"\n"}
                  </Text>
                  
                  <Text style={styles.label}> Métodos de barrera: </Text>
                  <Text style={styles.text}>
                    Impiden físicamente que los espermatozoides lleguen al óvulo{"\n"}{"\n"}
                    • Preservativo masculino: funda de látex o poliuretano que se coloca sobre el pene.{"\n"}
                    • Preservativo femenino: funda interna que se coloca en la vagina.{"\n"}
                    • Diafragma y capuchón cervical: barreras flexibles que cubren el cuello uterino.{"\n"}
                    • Espermicidas: cremas o geles que matan espermatozoides (se usan junto a otros métodos).{"\n"}
                  </Text>

                  <Text style={styles.label}>Métodos permanentes (quirúrgicos):</Text>
<Text style={styles.text}>
  Indicados para personas que ya no desean tener hijos.{"\n"}{"\n"}
  • Ligadura de trompas (mujer): bloquea las trompas de Falopio.{"\n"}
  • Vasectomía (hombre): corta los conductos deferentes.{"\n"}
</Text>

<Text style={styles.label}>Métodos de emergencia:</Text>
<Text style={styles.text}>
  Se utilizan solo después de una relación sexual sin protección, cuando falló el método habitual o no se usó ninguno.{"\n"}
  Su función es evitar o retrasar la ovulación, para prevenir el embarazo.{"\n"}{"\n"}

   1. Píldora del día después{"\n"}
  Existen dos tipos principales según su componente:{"\n"}{"\n"}

  • Levonorgestrel (ej. Postinor, Glanique, Escapel):{"\n"}
    - Debe tomarse lo antes posible después de la relación sin protección.{"\n"}
    - Es eficaz hasta 72 horas (3 días) después.{"\n"}
    - Antes de 24 horas: eficacia del 95%.{"\n"}
    - Entre 24 y 48 horas: eficacia del 85%.{"\n"}
    - Entre 48 y 72 horas: eficacia del 58% o menos.{"\n"}
    - Cuanto antes se tome, mejor protege.{"\n"}{"\n"}

  • Acetato de ulipristal (ej. EllaOne):{"\n"}
    - Puede tomarse hasta 120 horas (5 días) después.{"\n"}
    - Mantiene alta eficacia durante todo ese tiempo.{"\n"}
    - Es más efectiva que la de levonorgestrel si han pasado más de 3 días.{"\n"}
    - No debe usarse junto con otros anticonceptivos hormonales en los 5 días siguientes, ya que podría disminuir su efecto.{"\n"}{"\n"}

   2. DIU de cobre como anticoncepción de emergencia{"\n"}
    - Puede colocarse hasta 5 días después de la relación sexual sin protección.{"\n"}
    - Es el método más eficaz de emergencia (más del 99% de efectividad).{"\n"}
    - Además, puede dejarse colocado como anticonceptivo regular por 5 a 10 años.{"\n"}
</Text>



        
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Text style={styles.buttonText}>Volver</Text>
                  </TouchableOpacity>
                </ScrollView>
        
                <Text style={styles.footer}> 
                  Si estás con medicación o tenes mas dudas sobre los metodos, consultá con tu médico.
                </Text>
           </View>
            </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DE8FBC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#F2A9D0',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C2185B',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C2185B',
    marginTop: 10,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginVertical: 5,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#F776D1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 10,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});  