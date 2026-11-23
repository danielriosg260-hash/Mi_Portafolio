import { ScrollView, Pressable, Linking, View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { useRouter, useSearchParams } from 'solito/navigation'
import { PROJECTS, CONTACT } from 'app/data/portfolio'
import { colors, radius } from 'app/theme'

export function ProjectDetailScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params?.get('id')
  const project = PROJECTS.find((p) => p.id === id) ?? PROJECTS[0]

  if (!project) return null

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 60, gap: 18 }}
    >
      <Pressable
        onPress={() => router.back()}
        style={styles.back}
        hitSlop={12}
      >
        <Text style={styles.backText}>‹ Volver</Text>
      </Pressable>

      <MotiView
        from={{ opacity: 0, translateY: 18 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500 }}
        style={[styles.hero, { borderColor: project.gradient[0] + '55' }]}
      >
        <LinearGradient
          colors={[project.gradient[0] + '33', project.gradient[1] + '22']}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.emoji}>{project.emoji}</Text>
        <Text style={styles.kind}>{project.kind}</Text>
        <Text style={styles.name}>{project.name}</Text>
        <View
          style={[
            styles.status,
            {
              borderColor:
                project.status === 'Completado'
                  ? colors.green + '66'
                  : colors.amber + '66',
            },
          ]}
        >
          <Text
            style={{
              color: project.status === 'Completado' ? colors.green : colors.amber,
              fontSize: 12,
              fontWeight: '700',
            }}
          >
            ● {project.status}
          </Text>
        </View>
      </MotiView>

      <Block title="El problema" text={project.problem} accent={colors.magenta} />
      <Block title="La solución" text={project.solution} accent={colors.cyan} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Funcionalidades</Text>
        {project.features.map((f) => (
          <View key={f} style={styles.featureRow}>
            <Text style={{ color: colors.cyan, fontSize: 14 }}>✓</Text>
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologías</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {project.tech.map((t) => (
            <View key={t} style={styles.chip}>
              <Text style={styles.chipText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
        {project.demo && (
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: colors.gold,
              },
            ]}
            onPress={() => Linking.openURL(project.demo!)}
          >
            <Text style={[styles.btnText, { color: '#060709', fontWeight: '700' }]}>
              Ver Demo en vivo ↗
            </Text>
          </Pressable>
        )}
        {project.github && (
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1,
                borderColor: 'rgba(212,175,55,0.3)',
              },
            ]}
            onPress={() => Linking.openURL(project.github!)}
          >
            <Text style={styles.btnText}>Ver en GitHub ↗</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.btn, { backgroundColor: 'rgba(255,255,255,0.12)' }]}
          onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
        >
          <Text style={styles.btnText}>¡Hablemos de esto!</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

function Block({
  title,
  text,
  accent,
}: {
  title: string
  text: string
  accent: string
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 500, delay: 120 }}
      style={[styles.card, { borderLeftWidth: 3, borderLeftColor: accent }]}
    >
      <Text style={[styles.cardTitle, { color: accent, letterSpacing: 1.4 }]}>
        {title.toUpperCase()}
      </Text>
      <Text style={styles.paragraph}>{text}</Text>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  back: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backText: { color: colors.text, fontWeight: '600', fontSize: 14 },
  hero: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 26,
    alignItems: 'center',
    overflow: 'hidden',
    gap: 8,
  },
  emoji: { fontSize: 64 },
  kind: {
    color: colors.cyanSoft,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  name: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  status: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 18,
    gap: 10,
  },
  cardTitle: {
    color: colors.textDim,
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1.6,
    marginBottom: 2,
  },
  paragraph: { color: colors.textMuted, fontSize: 15, lineHeight: 23 },
  featureRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  featureText: { color: colors.textMuted, fontSize: 14.5, flex: 1, lineHeight: 21 },
  chip: {
    backgroundColor: 'rgba(124,58,237,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.4)',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: { color: '#c4b5fd', fontSize: 13, fontWeight: '600' },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  btnText: { color: '#04050a', fontWeight: '800', fontSize: 15 },
})
