import {FlatList,Text,StyleSheet} from 'react-native'
import {Aluno} from '../types/Aluno'
import { AlunoItem } from '../components/AlunoItem'

type Props={alunos:Aluno[], onRemover:(id:number)=>void}

export function AlunoList({alunos,onRemover}:Props){

    return(
        <FlatList
        data={alunos}
        keyExtractor={(item)=>String(item.id)}
        renderItem={({item})=>(
            <AlunoItem
            aluno={item}
            onRemover={onRemover}
            />
        )}
        ListEmptyComponent={
            <Text style={styles.vazio}> Nenhum item na Lista </Text>
        } 
        />

    )
}

const styles=StyleSheet.create({
vazio:{textAlign:"center",marginTop:40,color:"#635e5e"}
})