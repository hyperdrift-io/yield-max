import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { simulateYield, SimulationParams, SimulationResult } from '../api/protocols'

export function useYieldSimulator() {
  const queryClient = useQueryClient()
  const [simHistory, setSimHistory] = useState<SimulationResult[]>([])

  // Input state for simulation
  const [simParams, setSimParams] = useState<SimulationParams>({
    protocolId: '',
    amount: 1000,
    duration: 365 // Default to 1 year
  })

  // Mutation for running simulation
  const {
    mutate: runSimulation,
    data: currentResult,
    isPending: isSimulating,
    error: simulationError,
    reset: resetSimulation
  } = useMutation({
    mutationFn: simulateYield,
    onSuccess: (result) => {
      // Add to history when successful
      setSimHistory(prev => [result, ...prev.slice(0, 4)]) // Keep last 5 simulations

      // Invalidate protocols to ensure any related data is refreshed
      queryClient.invalidateQueries({ queryKey: ['protocols'] })
    }
  })

  // Update a single parameter
  const updateSimParam = (name: keyof SimulationParams, value: string | number) => {
    setSimParams(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Reset the simulator
  const resetSimulator = () => {
    setSimParams({
      protocolId: '',
      amount: 1000,
      duration: 365
    })
    resetSimulation()
  }

  // Clear history
  const clearHistory = () => {
    setSimHistory([])
  }

  return {
    // Parameters
    simParams,
    setSimParams,
    updateSimParam,

    // Simulation execution
    runSimulation,
    isSimulating,
    simulationError,
    resetSimulator,

    // Results
    currentResult,
    simHistory,
    clearHistory
  }
}
