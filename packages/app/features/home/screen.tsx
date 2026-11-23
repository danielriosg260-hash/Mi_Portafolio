import { useCallback, useContext, createContext, useMemo, useRef, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { useRouter } from 'solito/navigation'
import {
  PROFILE,
  CONTACT,
  ABOUT,
  EXPERIENCE,
  PROJECTS,
  TECH,
  EDUCATION,
  SKILLS,
  NAV_SECTIONS,
  MARQUEE_TECH,
} from 'app/data/portfolio'
import { colors, radius } from 'app/theme'
import { useSafeArea } from 'app/provider/safe-area'

const { height: SCREEN_H } = Dimensions.get('window')

/* ------------------------------------------------------------------ */
/* Contexto de animación: cada sección se revela al entrar en pantalla */
/* ------------------------------------------------------------------ */
type RevealCtx = { isVisible: (id: string) => boolean }
const RevealContext = createContext<RevealCtx>({ isVisible: () => true })

function AnimatedSection({
  id,
  eyebrow,
  title,
  titleAccent,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  titleAccent?: string
  children: React.ReactNode
}) {
  const { isVisible } = useContext(RevealContext)
  const visible = isVisible(id)

  return (
    <View
      style={styles.section}
      onLayout={(e) => {
        // registra la posición de la sección en el contenedor del scroll
        const store = sectionPositions.current
        const prev = store[id]
        const next = e.nativeEvent.layout.y
        if (prev !== next) {
          store[id] = next
        }
      }}
    >
      <MotiView
        from={{ opacity: 0, translateY: 26 }}
        animate={{ opacity: visible ? 1 : 0, translateY: visible ? 0 : 26 }}
        transition={{ duration: 600, delay: 60 }}
      >
        <View style={styles.eyebrow}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrowText}>{eyebrow}</Text>
        </View>

        <Text style={styles.sectionTitle}>
          {title}{' '}
          {titleAccent ? (
            <Text style={styles.gradientText}>{titleAccent}</Text>
          ) : null}
        </Text>

        <View style={{ marginTop: 18, gap: 16 }}>{children}</View>
      </MotiView>
    </View>
  )
}

/* ------------------------------- Cards ---------------------------- */
function Card({
  children,
  style,
  delay = 0,
}: {
  children: React.ReactNode
  style?: any
  delay?: number
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 18 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 550, delay }}
      style={[styles.card, style]}
    >
      {children}
    </MotiView>
  )
}

function Chip({ label, tint }: { label: string; tint?: string }) {
  return (
    <View
      style={[
        styles.chip,
        tint
          ? { borderColor: tint + '66', backgroundColor: tint + '1F' }
          : null,
      ]}
    >
      <Text style={[styles.chipText, tint ? { color: tint } : null]}>
        {label}
      </Text>
    </View>
  )
}

function GradientButton({
  label,
  onPress,
  gradient = colors.primaryGradient,
  ghost,
}: {
  label: string
  onPress: () => void
  gradient?: readonly [string, string]
  ghost?: boolean
}) {
  if (ghost) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.btnGhost, pressed && { opacity: 0.7 }]}>
        <Text style={styles.btnGhostText}>{label}</Text>
      </Pressable>
    )
  }
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.btnPrimary}
      >
        <Text style={styles.btnPrimaryText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  )
}

/* --------------------------- Esfera 3D fake ------------------------ */
function GlowOrb({
  size,
  colors: c,
  style,
  delay = 0,
}: {
  size: number
  colors: readonly [string, string]
  style?: any
  delay?: number
}) {
  return (
    <MotiView
      from={{ translateY: -10, scale: 0.95, rotateZ: '0deg' }}
      animate={{ translateY: 12, scale: 1.03, rotateZ: '12deg' }}
      transition={{
        duration: 3600,
        delay,
        loop: true,
        type: 'timing',
      }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
          shadowColor: c[0],
          shadowOpacity: 0.75,
          shadowRadius: 26,
          shadowOffset: { width: 0, height: 8 },
          elevation: 14,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={c}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{ flex: 1, borderRadius: size / 2 }}
      />
      <View
        style={{
          position: 'absolute',
          top: size * 0.16,
          left: size * 0.2,
          width: size * 0.3,
          height: size * 0.22,
          borderRadius: size / 2,
          backgroundColor: 'rgba(255,255,255,0.55)',
          opacity: 0.5,
        }}
      />
    </MotiView>
  )
}

/* ------------------------------- SCREEN ---------------------------- */
const sectionPositions: { current: Record<string, number> } = {
  current: {},
}
const HEADER_OFFSET = 70

export function HomeScreen() {
  const router = useRouter()
  const safe = useSafeArea()
  const scrollRef = useRef<ScrollView>(null)
  const [scrollY, setScrollY] = useState(0)
  const [active, setActive] = useState<string>('inicio')
  const rafRef = useRef<number | null>(null)
  const pendingY = useRef(0)

  const onScroll = useCallback((e: { nativeEvent: { contentOffset: { y: number } } }) => {
    pendingY.current = e.nativeEvent.contentOffset.y
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const y = pendingY.current
      setScrollY(y)

      let current = 'inicio'
      for (const s of NAV_SECTIONS) {
        const pos = sectionPositions.current[s.id]
        if (pos != null && y + 170 >= pos) current = s.id
      }
      setActive((prev) => (prev === current ? prev : current))
    })
  }, [])

  const isVisible = useCallback(
    (id: string) => {
      const pos = sectionPositions.current[id]
      if (pos == null) return scrollY > 0 ? true : id === 'inicio'
      return scrollY + SCREEN_H * 0.9 > pos
    },
    [scrollY]
  )

  const ctx = useMemo(() => ({ isVisible }), [isVisible])

  const goTo = (id: string) => {
    const pos = sectionPositions.current[id]
    if (pos == null) return
    scrollRef.current?.scrollTo({
      y: Math.max(0, pos - HEADER_OFFSET),
      animated: true,
    })
  }

  const openProject = (id: string) =>
    router.push({ pathname: '/projects/[id]', params: { id } })

  return (
    <RevealContext.Provider value={ctx}>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {/* ---------------- HEADER FIJO ---------------- */}
        <View
          style={[
            styles.header,
            {
              paddingTop: Math.max(safe.top, Platform.OS === 'android' ? 14 : 12),
              backgroundColor: 'rgba(4,5,10,0.92)',
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.headerRow}>
            <Pressable onPress={() => goTo('inicio')} style={styles.logo}>
              <LinearGradient
                colors={colors.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoMark}
              >
                <Text style={styles.logoText}>{PROFILE.initials}</Text>
              </LinearGradient>
              <Text style={styles.logoName}>
                Daniel <Text style={styles.gradientText}>Ríos</Text>
              </Text>
            </Pressable>

            <Pressable onPress={() => goTo('contacto')} style={styles.headerCta}>
              <Text style={styles.headerCtaText}>Hablemos</Text>
            </Pressable>
          </View>
        </View>

        {/* ---------------- CONTENIDO ---------------- */}
        <ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: safe.bottom + 40 }}
        >
          {/* HERO */}
          <View style={styles.hero}>
            <View style={styles.orbLayer} pointerEvents="none">
              <GlowOrb
                size={130}
                colors={colors.primaryGradient}
                style={{ position: 'absolute', right: -18, top: 30 }}
              />
              <GlowOrb
                size={80}
                colors={colors.pinkGradient}
                delay={500}
                style={{ position: 'absolute', left: -12, top: 170 }}
              />
              <GlowOrb
                size={54}
                colors={colors.mintGradient}
                delay={900}
                style={{ position: 'absolute', right: 70, top: 260 }}
              />
            </View>

            <MotiView
              from={{ opacity: 0, translateY: 24 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 700 }}
              style={{ gap: 14 }}
            >
              <View style={styles.heroTag}>
                <Text style={styles.heroTagText}>{PROFILE.role}</Text>
              </View>

              <Text style={styles.heroName}>
                Daniel{'\n'}
                <Text style={styles.gradientText}>Ríos Giraldo</Text>
              </Text>

              <Text style={styles.heroTagline}>{PROFILE.tagline}</Text>

              <Text style={styles.heroSubtitle}>{PROFILE.subtitle}</Text>

              <Text style={styles.heroBio}>{PROFILE.bio}</Text>

              <View style={styles.heroActions}>
                <GradientButton
                  label="Explorar proyectos"
                  onPress={() => goTo('proyectos')}
                />
                <GradientButton
                  label="Mi trayectoria"
                  onPress={() => goTo('experiencia')}
                  ghost
                />
              </View>

              <View style={{ gap: 6, marginTop: 6 }}>
                <Text style={styles.heroMeta}>📍 {PROFILE.location}</Text>
                <Text style={styles.heroMeta}>
                  💻 Desarrollo Web y Mobile
                </Text>
                <Text style={styles.heroMeta}>
                  🚀 Participando en proyectos de software
                </Text>
              </View>
            </MotiView>
          </View>

          {/* Marquee estático de tecnologías */}
          <View style={styles.marquee}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 22, paddingRight: 24 }}
            >
              {MARQUEE_TECH.concat(MARQUEE_TECH).map((t, i) => (
                <Text key={`${t}-${i}`} style={styles.marqueeItem}>
                  {t} <Text style={{ color: colors.violet }}>◆</Text>
                </Text>
              ))}
            </ScrollView>
          </View>

          {/* SOBRE MÍ */}
          <AnimatedSection
            id="sobre-mi"
            eyebrow="Sobre mí"
            title="Conoce un poco"
            titleAccent="sobre mí"
          >
            <Card delay={60}>
              {ABOUT.paragraphs.map((p, i) => (
                <Text
                  key={i}
                  style={[
                    styles.paragraph,
                    i === 0 && styles.paragraphLead,
                  ]}
                >
                  {p}
                </Text>
              ))}
            </Card>

            <Card delay={140}>
              <Text style={styles.cardTitle}>DATOS CLAVE</Text>
              {ABOUT.facts.map((f, i) => (
                <View
                  key={f.label}
                  style={[styles.factRow, i > 0 && { marginTop: 12 }]}
                >
                  <Text style={styles.factLabel}>{f.label}</Text>
                  <Text style={styles.factValue}>{f.value}</Text>
                </View>
              ))}
            </Card>
          </AnimatedSection>

          {/* EXPERIENCIA */}
          <AnimatedSection
            id="experiencia"
            eyebrow="Experiencia"
            title="Mi"
            titleAccent="trayectoria"
          >
            {EXPERIENCE.map((exp, i) => (
              <View key={exp.id} style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineDot,
                    {
                      borderColor: exp.highlight ? colors.cyan : colors.violet,
                    },
                  ]}
                />
                <Card delay={60 * i}>
                  <View style={styles.expTop}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <View style={styles.expPeriodWrap}>
                      <Text style={styles.expPeriod}>{exp.period}</Text>
                    </View>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.paragraph}>{exp.summary}</Text>
                  <View style={{ gap: 7, marginTop: 12 }}>
                    {exp.bullets.map((b) => (
                      <View key={b} style={styles.bulletRow}>
                        <Text style={{ color: colors.violet }}>▹</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              </View>
            ))}
          </AnimatedSection>

          {/* PROYECTOS */}
          <AnimatedSection
            id="proyectos"
            eyebrow="Proyectos destacados"
            title="Trabajos que"
            titleAccent="resuelven problemas"
          >
            {PROJECTS.map((p, i) => (
              <Pressable
                key={p.id}
                onPress={() => openProject(p.id)}
                style={({ pressed }) => [
                  styles.projectCard,
                  pressed && { transform: [{ scale: 0.985 }], borderColor: p.gradient[0] + '99' },
                ]}
              >
                <LinearGradient
                  colors={[p.gradient[0] + '30', p.gradient[1] + '1A']}
                  style={styles.projectCover}
                >
                  <Text style={{ fontSize: 46 }}>{p.emoji}</Text>
                  <View style={styles.projectYear}>
                    <Text style={styles.projectYearText}>{p.year}</Text>
                  </View>
                </LinearGradient>

                <View style={{ padding: 18, gap: 10 }}>
                  <Text style={styles.projectKind}>{p.kind}</Text>
                  <Text style={styles.projectName}>{p.name}</Text>

                  <Text style={[styles.cardTitle, { color: colors.magenta }]}>
                    EL PROBLEMA
                  </Text>
                  <Text style={styles.paragraph}>{p.problem}</Text>

                  <Text style={[styles.cardTitle, { color: colors.cyan }]}>
                    LA SOLUCIÓN
                  </Text>
                  <Text style={styles.paragraph}>{p.solution}</Text>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}>
                    {p.tech.map((t) => (
                      <Chip key={t} label={t} tint={p.gradient[0]} />
                    ))}
                  </View>

                  <View style={styles.projectFooter}>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            p.status === 'Completado'
                              ? colors.green
                              : p.status === 'En evolución'
                              ? colors.cyan
                              : colors.amber,
                        },
                      ]}
                    >
                      ● {p.status}
                    </Text>
                    <Text style={styles.projectCta}>Ver detalles →</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </AnimatedSection>

          {/* TECNOLOGÍAS */}
          <AnimatedSection
            id="tecnologias"
            eyebrow="Tecnologías"
            title="El stack con el que"
            titleAccent="construyo"
          >
            {TECH.map((group, i) => (
              <Card key={group.title} delay={50 * i}>
                <View style={styles.groupTitleRow}>
                  <View
                    style={[
                      styles.techDot,
                      { backgroundColor: group.color, shadowColor: group.color },
                    ]}
                  />
                  <Text style={styles.groupTitle}>{group.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {group.items.map((item) => (
                    <View key={item.name} style={styles.techItem}>
                      <Text style={styles.techItemName}>{item.name}</Text>
                      <Text
                        style={[
                          styles.techItemLevel,
                          {
                            color:
                              item.level === 'Experiencia práctica'
                                ? colors.green
                                : item.level === 'Conocimientos'
                                ? colors.cyanSoft
                                : colors.amber,
                          },
                        ]}
                      >
                        {item.level}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            ))}
          </AnimatedSection>

          {/* FORMACIÓN */}
          <AnimatedSection
            id="formacion"
            eyebrow="Formación"
            title="Base"
            titleAccent="académica"
          >
            {EDUCATION.map((edu, i) => (
              <Card key={edu.id} delay={60 * i}>
                <Text style={styles.eduTitle}>{edu.title}</Text>
                <Text style={styles.eduPlace}>{edu.place}</Text>
                <Text style={styles.eduLocation}>
                  📍 {edu.location}{edu.period ? ` · ${edu.period}` : ''}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 12 }}>
                  {edu.topics.map((t) => (
                    <Chip key={t} label={t} />
                  ))}
                </View>
              </Card>
            ))}
          </AnimatedSection>

          {/* HABILIDADES */}
          <AnimatedSection
            id="habilidades"
            eyebrow="Habilidades"
            title="Lo que aporto"
            titleAccent="al equipo"
          >
            <Card>
              <Text style={styles.cardTitle}>HABILIDADES TÉCNICAS</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS.technical.map((s) => (
                  <View key={s} style={[styles.skillPill, { borderColor: 'rgba(34,211,238,0.4)' }]}>
                    <Text style={[styles.skillText, { color: colors.cyanSoft }]}>{s}</Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card delay={90}>
              <Text style={styles.cardTitle}>HABILIDADES PERSONALES</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS.personal.map((s) => (
                  <View key={s} style={[styles.skillPill, { borderColor: 'rgba(236,72,153,0.4)' }]}>
                    <Text style={[styles.skillText, { color: '#fbcfe8' }]}>{s}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </AnimatedSection>

          {/* CONTACTO */}
          <AnimatedSection
            id="contacto"
            eyebrow="Contacto"
            title="¿Trabajamos"
            titleAccent="juntos?"
          >
            <MotiView
              from={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 600 }}
              style={styles.contactShell}
            >
              <LinearGradient
                colors={['rgba(34,211,238,0.16)', 'rgba(168,85,247,0.18)']}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.contactText}>
                Estoy abierto a oportunidades profesionales, proyectos de desarrollo,
                colaboraciones y nuevos retos tecnológicos que me permitan continuar
                creciendo como desarrollador de software. Si tienes una propuesta, un
                proyecto o deseas conocer más sobre mi trabajo, conversemos.
              </Text>

              <View style={{ gap: 12, marginTop: 20, width: '100%' }}>
                <GradientButton
                  label="✉  Enviar correo"
                  onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
                />
                <ContactRow
                  label="GitHub"
                  value={CONTACT.githubLabel}
                  onPress={() => Linking.openURL(CONTACT.github)}
                />
                <ContactRow
                  label="LinkedIn"
                  value={CONTACT.linkedinLabel}
                  onPress={() => Linking.openURL(CONTACT.linkedin)}
                />
                <ContactRow
                  label="WhatsApp"
                  value={CONTACT.whatsappLabel}
                  onPress={() => Linking.openURL(CONTACT.whatsapp)}
                />
              </View>
            </MotiView>
          </AnimatedSection>

          <Text style={styles.footer}>
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}{'\n'}
            Desarrollando ideas, aprendiendo tecnologías y construyendo soluciones digitales.
          </Text>
        </ScrollView>
      </View>
    </RevealContext.Provider>
  )
}

function ContactRow({
  label,
  value,
  onPress,
}: {
  label: string
  value: string
  onPress: () => void
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.contactRow, pressed && { opacity: 0.75 }]}>
      <View style={styles.contactIcon}>
        <Text style={{ fontSize: 16 }}>
          {label === 'GitHub'
            ? '🐙'
            : label === 'LinkedIn'
            ? '💼'
            : '💬'}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
      <Text style={{ color: colors.cyan, fontSize: 18 }}>›</Text>
    </Pressable>
  )
}

/* ------------------------------- STYLES ---------------------------- */
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    borderBottomWidth: 1,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#04050a', fontWeight: '900', fontSize: 14 },
  logoName: { color: colors.text, fontWeight: '700', fontSize: 15 },
  headerCta: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(34,211,238,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.45)',
  },
  headerCtaText: { color: colors.cyanSoft, fontWeight: '700', fontSize: 13 },
  chipsRow: { paddingHorizontal: 12, gap: 8 },
  navChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  navChipActive: {
    backgroundColor: 'rgba(34,211,238,0.9)',
    borderColor: 'transparent',
  },
  navChipText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  navChipTextActive: { color: '#04050a', fontWeight: '800' },

  hero: {
    paddingTop: HEADER_OFFSET + 28,
    paddingHorizontal: 20,
    paddingBottom: 34,
    gap: 16,
    overflow: 'hidden',
  },
  orbLayer: { ...StyleSheet.absoluteFillObject },
  heroTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.4)',
    backgroundColor: 'rgba(34,211,238,0.1)',
  },
  heroTagText: {
    color: colors.cyanSoft,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  heroName: {
    color: colors.text,
    fontSize: 46,
    lineHeight: 50,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  gradientText: {
    color: colors.cyan,
    // RN no soporta gradientes en texto: usamos un degradado simulado con tinte
    backgroundColor: 'transparent',
  },
  heroTagline: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 26,
  },
  heroSubtitle: {
    color: colors.cyanSoft,
    fontSize: 12.5,
    letterSpacing: 1.2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  heroBio: { color: colors.textMuted, fontSize: 15.5, lineHeight: 24 },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6 },
  heroMeta: { color: colors.textDim, fontSize: 14 },

  btnPrimary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cyan,
    shadowOpacity: 0.6,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  btnPrimaryText: { color: '#04050a', fontWeight: '800', fontSize: 15 },
  btnGhost: {
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: { color: colors.text, fontWeight: '700', fontSize: 15 },

  marquee: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(34,211,238,0.05)',
    paddingVertical: 14,
    paddingLeft: 20,
  },
  marqueeItem: {
    color: colors.textDim,
    fontSize: 14,
    letterSpacing: 1.2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  section: { paddingHorizontal: 20, paddingTop: 46 },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.35)',
    backgroundColor: 'rgba(34,211,238,0.08)',
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cyan,
  },
  eyebrowText: {
    color: colors.cyanSoft,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginTop: 14,
    letterSpacing: -0.8,
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 20,
    overflow: 'hidden',
  },
  cardTitle: {
    color: colors.textDim,
    fontSize: 10.5,
    letterSpacing: 1.8,
    fontWeight: '800',
    marginBottom: 8,
  },
  paragraph: { color: colors.textMuted, fontSize: 15, lineHeight: 23 },
  paragraphLead: { color: colors.text, fontSize: 16.5, lineHeight: 26, fontWeight: '600' },

  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  factLabel: {
    color: colors.violet,
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '800',
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  factValue: { color: colors.text, fontSize: 14, flexShrink: 1, textAlign: 'right' },

  timelineItem: { paddingLeft: 22, position: 'relative' },
  timelineDot: {
    position: 'absolute',
    left: -6,
    top: 24,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.bg,
    borderWidth: 3,
    shadowColor: colors.cyan,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    flexWrap: 'wrap',
  },
  expRole: { color: colors.text, fontSize: 19, fontWeight: '800', flex: 1 },
  expPeriodWrap: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  expPeriod: { color: colors.textDim, fontSize: 11, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  expCompany: { color: colors.cyan, fontWeight: '700', fontSize: 14.5, marginTop: 4, marginBottom: 8 },
  bulletRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  bulletText: { color: colors.textMuted, fontSize: 14.5, flex: 1, lineHeight: 21 },

  projectCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  projectCover: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  projectYear: {
    position: 'absolute',
    top: 12,
    right: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(4,5,10,0.6)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  projectYearText: { color: colors.textMuted, fontSize: 11, letterSpacing: 1.4 },
  projectKind: {
    color: colors.cyan,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  projectName: { color: colors.text, fontSize: 23, fontWeight: '800' },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 13,
    marginTop: 4,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  projectCta: { color: colors.text, fontSize: 13.5, fontWeight: '700' },

  groupTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 12 },
  techDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  groupTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  techItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 13,
    paddingVertical: 9,
    gap: 2,
  },
  techItemName: { color: colors.text, fontSize: 14, fontWeight: '700' },
  techItemLevel: { fontSize: 10.5, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  eduTitle: { color: colors.text, fontSize: 19, fontWeight: '800', lineHeight: 25 },
  eduPlace: { color: colors.cyan, fontSize: 14.5, fontWeight: '600', marginTop: 5 },
  eduLocation: { color: colors.textDim, fontSize: 13, marginTop: 4 },

  skillPill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  skillText: { fontSize: 14, fontWeight: '600' },

  contactShell: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
    overflow: 'hidden',
  },
  contactText: { color: colors.textMuted, fontSize: 15, lineHeight: 24 },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: 'rgba(4,5,10,0.65)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34,211,238,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(34,211,238,0.35)',
  },
  contactLabel: { color: colors.text, fontSize: 15, fontWeight: '700' },
  contactValue: { color: colors.textDim, fontSize: 13 },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  chipText: { color: colors.textMuted, fontSize: 12.5, fontWeight: '600' },

  footer: {
    color: colors.textDim,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
})
