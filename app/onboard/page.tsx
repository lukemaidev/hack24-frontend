'use client'

import { useMemo, useState } from "react"
import { Welcome } from "@/components/onboard/welcome"
import { VisionQ1 } from "@/components/onboard/vision-q1"
import { ArchetypePicker } from "@/components/onboard/archetype-picker"
import { VisionQ2 } from "@/components/onboard/vision-q2"
import { TimeframeStep } from "@/components/onboard/timeframe-step"
import { StageStep } from "@/components/onboard/stage-step"
import { ConstraintStep } from "@/components/onboard/constraint-step"
import { TuesdayMorning } from "@/components/onboard/tuesday-morning"
import { RoleModels } from "@/components/onboard/role-models"
import { VisionSummary } from "@/components/onboard/vision-summary"
import { PermissionIntro } from "@/components/onboard/permission-intro"
import { PlatformConnect } from "@/components/onboard/platform-connect"
import { AuditRunning } from "@/components/onboard/audit-running"
import { ScoreReveal } from "@/components/onboard/score-reveal"
import { RadarChart } from "@/components/onboard/radar-chart"
import { DietBreakdown } from "@/components/onboard/diet-breakdown"
import { IdentityDrift } from "@/components/onboard/identity-drift"
import { AuditSummary } from "@/components/onboard/audit-summary"
import { PrescriptionCover } from "@/components/onboard/prescription-cover"
import { MentorChannels } from "@/components/onboard/mentor-channels"
import { GatewayLanding } from "@/components/onboard/gateway-landing"
import { UploadStep } from "@/components/onboard/upload-step"
import { useRouter } from "next/navigation"

export default function OnboardPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [aspiration, setAspiration] = useState("")
  const [archetype, setArchetype] = useState("Builder")
  const [aspirationDrill, setAspirationDrill] = useState("")
  const [timeframe, setTimeframe] = useState("Within 1 year")
  const [stage, setStage] = useState("Just starting out")
  const [constraint, setConstraint] = useState("Time")
  const [tuesdayText, setTuesdayText] = useState("")

  const handleNext = () => {
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 0))
  }

  const navigateToPortal = () => {
    // Implement navigation logic here, e.g., using Next.js router
    
    router.push("/portal");
  }

  const steps = [
    // Section 2: Vision & Identity (screens 6–14)
    <Welcome key="welcome" onNext={handleNext} />,
    <VisionQ1
      key="vision-q1"
      value={aspiration}
      onChange={setAspiration}
      onNext={handleNext}
      onSkip={() => setStep(2)}
    />,
    <ArchetypePicker
      key="archetype"
      value={archetype}
      onSelect={setArchetype}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <VisionQ2
      key="vision-q2"
      archetype={archetype}
      value={aspirationDrill}
      onChange={setAspirationDrill}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <TimeframeStep
      key="timeframe"
      value={timeframe}
      onSelect={setTimeframe}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <StageStep
      key="stage"
      value={stage}
      onSelect={setStage}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <ConstraintStep
      key="constraint"
      value={constraint}
      onSelect={setConstraint}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <TuesdayMorning
      key="tuesday"
      value={tuesdayText}
      onChange={setTuesdayText}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <RoleModels key="role-models" onNext={handleNext} onBack={handleBack} />,
    <VisionSummary
      key="vision-summary"
      aspiration={aspiration}
      archetype={archetype}
      drillDetail={aspirationDrill}
      timeframe={timeframe}
      stage={stage}
      constraint={constraint}
      onNext={handleNext}
      onBack={() => setStep(1)}
    />,

    // Section 3: Platforms Ingestion (screens 15–18)
    <PermissionIntro key="permission-intro" onNext={handleNext} />,
    <PlatformConnect key="platform-connect" onNext={handleNext} onBack={handleBack} />,
    <UploadStep key="upload-step" onNext={handleNext} onBack={handleBack} />,
    <AuditRunning key="audit-running" onNext={handleNext} />,

    // Section 4: The Audit Reveal (screens 19–23)
    <ScoreReveal key="score-reveal" onNext={handleNext} />,
    <RadarChart key="radar-chart" onNext={handleNext} onBack={handleBack} />,
    <DietBreakdown key="diet-breakdown" onNext={handleNext} onBack={handleBack} />,
    <IdentityDrift
      key="identity-drift"
      aspiration={aspiration}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <AuditSummary key="audit-summary" onNext={handleNext} onBack={handleBack} />,

    // Section 5: Curated Prescriptions (screens 24–25)
    <PrescriptionCover key="prescription-cover" onNext={handleNext} onBack={handleBack} />,
    <MentorChannels key="mentor-channels" onNext={handleNext} onBack={handleBack} />,

    // Screen 29: Gateway Landing
    <GatewayLanding key="gateway-landing" onNext={navigateToPortal} />,
  ]

  const progress = useMemo(
    () => Math.round(((step + 1) / steps.length) * 100),
    [step, steps.length]
  )

  return (
    <div className="min-h-screen bg-background px-1 py-1">
      <div className="mx-auto flex h-full min-h-screen w-full max-w-sm items-center justify-center px-1">
        <div className="w-full space-y-4 pb-24">
          <div className="rounded-[32px] border border-card bg-card/40 p-4 shadow-[0_20px_50px_-30px_rgba(31,29,26,0.18)]">
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-muted">
              <span>Onboarding</span>
              <span>{step + 1} / {steps.length}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="h-full w-full">{steps[step]}</div>
        </div>
      </div>
    </div>
  )
}
