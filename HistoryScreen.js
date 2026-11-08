import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { speak } from '../utils/speech';

const COLORS = {
  primary: '#1a1a2e',
  accent: '#e94560',
  secondary: '#16213e',
  card: '#0f3460',
  text: '#ffffff',
  muted: '#a0a0b0',
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
};

const EVENT_ICONS = {
  danger: { icon: 'warning', color: COLORS.danger },
  warning: { icon: 'alert-circle', color: COLORS.warning },
  ocr: { icon: 'text', color: COLORS.accent },
  navigation: { icon: 'navigate', color: COLORS.success },
  emergency: { icon: 'alert-circle', color: COLORS.danger },
};

function formatTimestamp(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function HistoryScreen() {
  const { eventHistory, settings } = useApp();

  const renderEvent = ({ item }) => {
    const { icon, color } = EVENT_ICONS[item.type] || { icon: 'information-circle', color: COLORS.muted };
    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => speak(item.message, { rate: settings.speechRate })}
        accessibilityLabel={`Event: ${item.message}`}
      >
        <View style={[styles.eventIcon, { backgroundColor: color + '20', borderColor: color }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.eventContent}>
          <Text style={styles.eventType}>{item.type?.toUpperCase()}</Text>
          <Text style={styles.eventMessage}>{item.message}</Text>
          {item.location && <Text style={styles.eventLocation}>📍 {item.location}</Text>}
          <Text style={styles.eventTime}>{formatTimestamp(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time" size={28} color={COLORS.accent} />
        <Text style={styles.headerTitle}>Safety Event History</Text>
      </View>

      <View style={styles.hint}>
        <Ionicons name="volume-high" size={14} color={COLORS.muted} />
        <Text style={styles.hintText}>Tap an event to hear it aloud</Text>
      </View>

      {eventHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={64} color={COLORS.muted} />
          <Text style={styles.emptyTitle}>No events yet</Text>
          <Text style={styles.emptyText}>Safety events, navigation logs, and emergency alerts will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={eventHistory}
          keyExtractor={item => item.id}
          renderItem={renderEvent}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, paddingTop: 8 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  hintText: { color: COLORS.muted, fontSize: 12 },
  list: { paddingBottom: 24 },
  eventCard: {
    flexDirection: 'row', backgroundColor: COLORS.secondary, borderRadius: 14,
    padding: 14, marginBottom: 10, gap: 12,
  },
  eventIcon: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  eventContent: { flex: 1 },
  eventType: { fontSize: 11, fontWeight: 'bold', color: COLORS.muted, marginBottom: 2 },
  eventMessage: { fontSize: 15, color: COLORS.text, lineHeight: 20, marginBottom: 4 },
  eventLocation: { fontSize: 12, color: COLORS.muted, marginBottom: 4 },
  eventTime: { fontSize: 11, color: COLORS.muted },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: 14, color: COLORS.muted, textAlign: 'center', lineHeight: 20 },
});
