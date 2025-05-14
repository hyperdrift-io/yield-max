PROTOCOL_LIST=["aave", "yearn-finance", "curve-finance", "uniswap", "sushiswap", "pancakeswap", "balancer", "pendle", "convex-finance", "aura-finance", "lido-finance", "makerdao", "alpaca-finance", "beefy-finance", "frax-finance", "harvest-finance", "stake-dao", "eigenlayer", "jito"]. 

1. **Retain Core Fields:** Keep `id`, `name`, `logoUrl`, `description`, `website`, `tvl`, `liquidity`, `vcBacking`, `metadata` (with `chains`, `launchDate`, `token`, `governance`), and `tokenPages` (with `tvlAndApy` and `tokenData`).
2. **Date Format:** Convert all dates (e.g., `launchDate`) to the format `%dd_%mm_%YYYY` (e.g., `23_03_2025`).
3. **Image Links:** Do not modify `logoUrl`; use the existing value unchanged.
4. **Update Numerical Values:** Refresh `tvl`, `liquidity`, and `easeOfUseScore` (0-100) with realistic, unique values reflecting plausible growth or changes as of March 23, 2025.
5. **Remove Fields:** Delete `engagement`, `auditDetails`, and `nbAudits` from each entry.
6. **Modify `infoSources`:** Retain only `news` (list of sources) and `security` (URL to the protocol’s security page if available, e.g., from official docs); remove `audits`.
7. **Transform `apy`:** Replace the numeric `apy` with an object containing:
   - `value`: A realistic APY percentage (e.g., 2-18%, varying by protocol).
   - `explanation`: A simple, user-friendly text (1-2 sentences) explaining how the APY is calculated for that protocol (e.g., based on staking rewards, trading fees, or lending yields specific to its mechanism).
8. **Update `riskAssessment`:** Include:
   - Categories: `smartContractRisk`, `impermanentLoss`, `marketRisk`, `liquidationRisk`, `tokenomicDesignRisk`.
   - For each category: Provide a `description` (qualitative assessment of risk level: low, moderate, high) and a `score` (0-100, where 100 is safest; e.g., low=80-100, moderate=60-79, high=40-59). Do not include `additionalLinks`.
   - `safetyScore`: Calculate as the average of the five category scores, rounded to the nearest integer.
9. **Add `communityLinks`:** Include:
   - `twitter`: Official Twitter URL (e.g., `https://twitter.com/protocolName`).
   - `discord`: Official Discord invite URL (e.g., `https://discord.com/invite/protocolName`).
   - `github`: Official GitHub URL (e.g., `https://github.com/protocolName`).
   - Source these from each protocol’s official website or known community channels as of March 23, 2025.
10. **Download Link:** Provide a simulated download link for the entire updated JSON array in the format `deFi_protocols_23_03_2025.json` (e.g., `https://example.com/download/deFi_protocols_23_03_2025.json`).

For each protocol, tailor the `apy.explanation` and `riskAssessment` descriptions to its specific mechanics (e.g., lending for Aave, AMM for Uniswap, yield optimization for Yearn). Use the initial JSON provided earlier in the thread as the baseline for field values where applicable, updating them as specified. Output the complete updated JSON array and the download link.

Update the JSON values
The file should use the format %dd%mm%YYY (ie: 23_03_2025)
- do not change image links
- update all other values

- search for protocol audits and add the recent ones in auditDetails (ensure they exist)
- upsert the risk assement with following (each category should have a description, additional links if available):
 - smart contract risk
 - Impermanent Loss
 - Market Risk
 - Liquidation Risk
 - Tokenomic Design Risk
  - safety sore: sums up the risk assessement of above values 


# maintenance
remove realTimeData prop
remove onChainData prop
update apiSources ttvlAndApy and tokenData using a uri similar to the existing one for AAVE (ensure links exist)
rename audit to nbAudits
remove safetyScore
remove unbondingPeriod


# prompts
23_03_2025
Update the JSON values
all score should be values between 0 and 100
The file should use the format %dd%mm%YYY (ie: 23_03_2025) and be available as a link to download the JSON
- do not change image links
- update all other values
- a link to protocol security page if found in infoSources
- upsert the risk assement with following. Each category should have a description, additional links if available, and a score:
 - smart contract risk
 - Impermanent Loss
 - Market Risk
 - Liquidation Risk
 - Tokenomic Design Risk
  - safety sore: sums up the risk assessement of above scores above (each category has its own score)

Break down the processing of the JSON values in 2 steps to avoid creating a query too large


--
Update the JSON entries for the following list of DeFi protocols: ["aave", "yearn-finance", "curve-finance", "uniswap", "sushiswap", "pancakeswap", "balancer", "pendle", "convex-finance", "aura-finance", "lido-finance", "makerdao", "alpaca-finance", "beefy-finance", "frax-finance", "harvest-finance", "stake-dao", "eigenlayer", "jito"]. Use the current date, as the reference point. Apply the following transformations to each entry based on the provided initial JSON structure:

1. **Retain Core Fields:** Keep `id`, `name`, `logoUrl`, `description`, `website`, `tvl`, `liquidity`, `vcBacking`, `metadata` (with `chains`, `launchDate`, `token`, `governance`), and `tokenPages` (with `tvlAndApy` and `tokenData`).
2. **Date Format:** Convert all dates (e.g., `launchDate`) to the format `%dd_%mm_%YYYY` (e.g., `23_03_2025`).
3. **Image Links:** Do not modify `logoUrl`; use the existing value unchanged.
4. **Update Numerical Values:** Refresh `tvl`, `liquidity`, and `easeOfUseScore` (0-100) with realistic, unique values reflecting plausible growth or changes as of today. Data accuracy is critical.
5. **Remove Fields:** Delete `engagement`, `auditDetails`, and `nbAudits` from each entry.
6. **Modify `infoSources`:** Retain only `news` (list of sources) and `security` (URL to the protocol’s security page if available, e.g., from official docs); remove `audits`.
7. **Transform `apy`:** Replace the numeric `apy` with an object containing:
   - `value`: A realistic APY percentage (e.g., 2-18%, varying by protocol).
   - `explanation`: A simple, user-friendly text (1-2 sentences) explaining how the APY is calculated for that protocol (e.g., based on staking rewards, trading fees, or lending yields specific to its mechanism).
8. **Update `riskAssessment`:** Include:
   - Categories: `smartContractRisk`, `impermanentLoss`, `marketRisk`, `liquidationRisk`, `tokenomicDesignRisk`.
   - For each category: Provide a `description` (qualitative assessment of risk level: low, moderate, high) and a `score` (0-100, where 100 is safest; e.g., low=80-100, moderate=60-79, high=40-59). Do not include `additionalLinks`.
   - `safetyScore`: Calculate as the average of the five category scores, rounded to the nearest integer.
9. **Add `communityLinks`:** Include:
   - `twitter`: Official Twitter URL (e.g., `https://twitter.com/protocolName`).
   - `discord`: Official Discord invite URL (e.g., `https://discord.com/invite/protocolName`).
   - `github`: Official GitHub URL (e.g., `https://github.com/protocolName`).
   - Source these from each protocol’s official website or known community channels as of March 23, 2025.
10. **Download Link:** Provide a simulated download link for the entire updated JSON array in the format `deFi_protocols_23_03_2025.json` (e.g., `https://example.com/download/deFi_protocols_23_03_2025.json`).

For each protocol, tailor the `apy.explanation` and `riskAssessment` descriptions to its specific mechanics (e.g., lending for Aave, AMM for Uniswap, yield optimization for Yearn). Use the initial JSON provided earlier in the thread as the baseline for field values where applicable, updating them as specified. Output the complete updated JSON array and the download link.

--

actualise the content of yield_data.jsonc by gathering the most up to date data available regarding the protocol listed in PROTOCOL_LIST.
the content should follow the same format as yield_data.jsonc
The new data content should store in data/yield_data_DATE where date is in format dd/mm/yyyy
the yield_data.jsonc should then point to that file with a comment on date generation on top

actualisze the JSON entries for the following list of DeFi protocols: ["aave", "yearn-finance", "curve-finance", "uniswap", "sushiswap", "pancakeswap", "balancer", "pendle", "convex-finance", "aura-finance", "lido-finance", "makerdao", "alpaca-finance", "beefy-finance", "frax-finance", "harvest-finance", "stake-dao", "eigenlayer", "jito"]. Use the current date, as the reference point. Apply the following transformations to each entry based on the provided initial JSON structure:


[JSON]