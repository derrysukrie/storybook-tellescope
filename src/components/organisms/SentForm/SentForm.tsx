import { Box, FormControlLabel, Typography } from '@mui/material'
import type { ErrorInfo, ReactNode } from 'react'
import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TellescopeLogo from '../../../assets/tellescope-logo.svg'
import { CheckBox, LinearProgress } from '../../atoms'
import { Button } from '../../atoms/button/button'
import { FormProvider } from './FormContext'
import { StepSkeleton } from './Steps/StepSkeleton'
import { renderStep } from './stepRenderer'
import { sentFormStyles } from './styles'
import type { FormData, SentFormProps } from './types/types'
import { isStepValid } from './validation/validation'

// Error boundary component to catch errors in lazy-loaded components
class ErrorBoundary extends Component<
    { children: ReactNode; fallback: ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error in component:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}

export const SentForm = ({
    steps,
    onComplete,
    onFormDataChange,
    debounceDelay = 300,
}: SentFormProps) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [checked, setChecked] = useState(false)
    // Add centralized form state
    const [formData, setFormData] = useState<FormData>({})

    // Debounce timer ref
    const debounceTimerRef = useRef<number | null>(null)

    const currentStepData = steps[currentStep]

    // Memoize progress calculation
    const progress = useMemo(() => {
        return ((currentStep + 1) / steps.length) * 100
    }, [currentStep, steps.length])

    const isLastStep = currentStep === steps.length - 1

    // Check if current step is valid
    const isCurrentStepValid = useMemo(() => {
        return isStepValid(currentStepData, formData, checked)
    }, [currentStepData, formData, checked])

    // Debounced form data change handler
    const debouncedFormDataChange = useCallback(
        (newData: FormData) => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }

            debounceTimerRef.current = window.setTimeout(() => {
                onFormDataChange?.(newData)
            }, debounceDelay)
        },
        [onFormDataChange, debounceDelay]
    )

    // Function to update form data from any step
    const updateFormData = useCallback(
        (stepId: string, value: unknown) => {
            setFormData(prev => {
                const newData = { ...prev, [stepId]: value }
                // Use debounced callback to avoid excessive calls
                debouncedFormDataChange(newData)
                return newData
            })
        },
        [debouncedFormDataChange]
    )

    const handleNext = useCallback(() => {
        if (isLastStep) {
            // Log all collected form data when completing
            console.log('All form data:', formData)
            onComplete?.(formData)
        } else {
            setCurrentStep(currentStep + 1)
        }
    }, [isLastStep, formData, onComplete, currentStep])

    // Memoize context value to prevent unnecessary re-renders
    const formContext = useMemo(
        () => ({
            updateFormData,
            formData,
            currentStep: currentStepData.id || `step-${currentStep}`,
        }),
        [updateFormData, formData, currentStepData.id, currentStep]
    )

    // Cleanup debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    return (
        <Box sx={sentFormStyles.container}>
            <Box sx={sentFormStyles.contentWrapper}>
                <LinearProgress
                    sx={sentFormStyles.progressBar}
                    variant="determinate"
                    value={progress}
                />
                {currentStep !== 0 && (
                    <Box sx={sentFormStyles.logoContainer}>
                        <img
                            src={TellescopeLogo}
                            alt="Tellescope Logo"
                            style={sentFormStyles.logo}
                        />
                    </Box>
                )}
                <Box sx={sentFormStyles.contentContainer}>
                    <Box sx={sentFormStyles.contentBox}>
                        <FormProvider value={formContext}>
                            <ErrorBoundary
                                fallback={
                                    <Box sx={{ p: 2, textAlign: 'center' }}>
                                        <Typography color="error" variant="body1">
                                            Failed to load form step. Please try refreshing the
                                            page.
                                        </Typography>
                                        <Button
                                            size="small"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                            onClick={() => window.location.reload()}
                                        >
                                            Refresh
                                        </Button>
                                    </Box>
                                }
                            >
                                <Suspense fallback={<StepSkeleton />}>
                                    {renderStep(currentStepData)}
                                </Suspense>
                            </ErrorBoundary>
                        </FormProvider>
                    </Box>
                </Box>
                <Box sx={sentFormStyles.bottomContainer}>
                    <Box sx={sentFormStyles.checkboxContainer}>
                        {currentStep === 0 && (
                            <FormControlLabel
                                sx={sentFormStyles.formControlLabel}
                                control={
                                    <CheckBox
                                        checked={checked}
                                        onChange={e => setChecked(e.target.checked)}
                                        sx={sentFormStyles.checkbox}
                                    />
                                }
                                label={
                                    <Typography variant="caption" color="text.secondary">
                                        a longer label and will displayed at a smaller size in order
                                        to conserve valuable space. This can be used to display some
                                        disclaimer about terms or conditions that might be a bit too
                                        long for a normal label area
                                    </Typography>
                                }
                            />
                        )}
                    </Box>
                    <Box sx={sentFormStyles.buttonContainer}>
                        <Button
                            onClick={handleNext}
                            size="large"
                            sx={sentFormStyles.continueButton}
                            disabled={!isCurrentStepValid}
                            fullWidth
                        >
                            CONTINUE
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
