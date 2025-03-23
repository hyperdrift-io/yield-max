"use client";

import { useState, useEffect } from 'react';
import { getProtocols } from '../../src/api/protocols';
import SimulatorResult from '../../src/components/SimulatorResult';
import styles from './page.module.css';
import { Protocol } from '../../src/types/protocol';

// Define the simulation result type
type SimulationResultType = {
  protocol: Protocol;
  initialAmount: number;
  period: number;
  yieldCalculations: {
    dailyYield: number;
    monthlyYield: number;
    totalYield: number;
    finalAmount: number;
  };
};

export default function SimulatorPage() {
  const [amount, setAmount] = useState('1000');
  const [days, setDays] = useState('365');
  const [selectedProtocolId, setSelectedProtocolId] = useState('');
  const [simulationResult, setSimulationResult] = useState<SimulationResultType | null>(null);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Set up preset timeframes
  const timeframes = [
    { label: '30 days', value: '30' },
    { label: '90 days', value: '90' },
    { label: '1 year', value: '365' }
  ];

  // Load protocols on component mount
  useEffect(() => {
    async function loadProtocols() {
      try {
        const data = await getProtocols();
        setProtocols(data);

        // Set default selected protocol if none is selected
        if (!selectedProtocolId && data.length > 0) {
          setSelectedProtocolId(data[0].id);
        }
      } catch (error) {
        console.error("Error loading protocols:", error);
      }
    }
    loadProtocols();
  }, [selectedProtocolId]);

  const handleSimulate = async () => {
    if (!amount || !days || !selectedProtocolId) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    const selectedProtocol = protocols.find(p => p.id === selectedProtocolId);
    if (!selectedProtocol) {
      setIsLoading(false);
      return;
    }

    // Calculate simulation result
    const initialAmount = parseFloat(amount);
    const period = parseInt(days);
    const apy = selectedProtocol.apy;

    const dailyRate = Math.pow(1 + apy / 100, 1 / 365) - 1;
    const totalYield = initialAmount * Math.pow(1 + dailyRate, period) - initialAmount;
    const dailyYield = initialAmount * dailyRate;
    const monthlyYield = initialAmount * (Math.pow(1 + dailyRate, 30) - 1);
    const finalAmount = initialAmount + totalYield;

    // Set simulation result
    setSimulationResult({
      protocol: selectedProtocol,
      initialAmount,
      period,
      yieldCalculations: {
        dailyYield,
        monthlyYield,
        totalYield,
        finalAmount
      }
    });

    setIsLoading(false);
  };

  const handleTimeframeClick = (value: string) => {
    setDays(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Yield Simulator</h1>
        <p>Calculate your potential returns across different protocols and time periods</p>
      </div>

      <div className={styles.simulatorCard}>
        <h2>Input Parameters</h2>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="protocol">Protocol</label>
            <div className={styles.selectWrapper}>
              <select
                id="protocol"
                value={selectedProtocolId}
                onChange={(e) => setSelectedProtocolId(e.target.value)}
                className={styles.select}
              >
                <option value="">Select a protocol</option>
                {protocols.map((protocol) => (
                  <option key={protocol.id} value={protocol.id}>
                    {protocol.name} ({protocol.apy}% APY)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="amount">Investment Amount (USD)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="1"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="days">Time Period (days)</label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
              max="3650"
              className={styles.input}
            />

            <div className={styles.timeframes}>
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.value}
                  className={`${styles.timeframeButton} ${days === timeframe.value ? styles.active : ''}`}
                  onClick={() => handleTimeframeClick(timeframe.value)}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.calculateButton}
            onClick={handleSimulate}
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : 'Calculate Returns'}
          </button>
        </div>
      </div>

      {simulationResult && (
        <SimulatorResult result={simulationResult} />
      )}
    </div>
  );
}
