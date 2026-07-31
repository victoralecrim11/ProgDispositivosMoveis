import { Text, View } from "react-native";

const DashBoard = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          backgroundColor: "#007AFF",
          paddingVertical: 20,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
          Boas vindas ao Dashboard!
        </Text>
      </View>
{/* 
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            Vendas
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#007AFF" }}>
            R$ 1.250,00
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            Pedidos
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#007AFF" }}>
            25
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            Clientes
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#007AFF" }}>
            150
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            Produtos
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#007AFF" }}>
            48
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
        }}
      >
        <Text style={{ fontSize: 14, color: "#999" }}>
          Últimas atualizações
        </Text>
      </View> */}
    </View>
  );
};

export default DashBoard;
