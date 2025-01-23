import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Gauge as CanvasGauge, Donut } from 'gaugejs/dist/gauge.min'
import PlusIcon from '../../assets/icons/plus-circle.svg'
import MinusIcon from '../../assets/icons/minus-circle.svg'

/**
 * React wrapper for GaugeJS.
 * @param {*} props
 * @return {Object} React element
 */
const Gauge = (props: any) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const span = useRef<HTMLSpanElement>(null)
  const gauge = useRef<CanvasGauge>(null)

  // useEffect(() => {
  //   if (!span.current) return

  //   // Observe the span node
  //   const config = {
  //     characterData: true,
  //     attributes: true,
  //     childList: true,
  //     subtree: true
  //   }
  //   const observer = new MutationObserver((mutationsList, observer) => {
  //     props.textChangeHandler.call(undefined, span.current?.innerText)
  //   })
  //   observer.observe(span.current, config)

  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [props.textChangeHandler])

  useEffect(() => {
    if (!canvas.current) return

    canvas.current.width = 300
  }, [])

  useEffect(() => {
    if (!canvas.current) return
    gauge.current = props.donut ? new Donut(canvas.current) : new CanvasGauge(canvas.current)
    gauge.current.setTextField(span.current)
    gauge.current.setOptions(props.options)
    gauge.current.maxValue = props.maxValue
    gauge.current.setMinValue(props.minValue)
    gauge.current.animationSpeed = props.animationSpeed
    gauge.current.set(props.value)
  }, [props.donut]) // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   gauge.current.setOptions(props.options)
  // }, [props.options])

  useEffect(() => {
    gauge.current.maxValue = props.maxValue
  }, [props.maxValue])

  useEffect(() => {
    gauge.current.setMinValue(props.minValue)
  }, [props.minValue])

  useEffect(() => {
    gauge.current.animationSpeed = props.animationSpeed
  }, [props.animationSpeed])

  useEffect(() => {
    gauge.current.set(props.value)
  }, [props.value])

  /* eslint-disable no-unused-vars */
  const {
    maxValue,
    minValue,
    animationSpeed,
    options,
    donut,
    value,
    textChangeHandler,
    ...passThroughProps
  } = props

  const { interaction_type, hit_count, id } = props.interaction

  /* eslint-enable no-unused-vars */

  return (
    <>
      <div className="gauge__container">
        <h2 className="gauge__header">{interaction_type}</h2>
        <canvas ref={canvas} {...passThroughProps}></canvas>
        <span ref={span} style={{ display: 'none' }}></span>
        <p className="gauge__value">{hit_count}</p>
        <div className="button__container flex centered">
          <button className="button danger" onClick={() => props.handleClick(id, hit_count - 1)}>
            <img alt="plus icon to increment" src={MinusIcon} width="40px" height="40px" />
          </button>
          <button className="button success" onClick={() => props.handleClick(id, hit_count + 1)}>
            <img alt="plus icon to increment" src={PlusIcon} width="40px" height="40px" />
          </button>
        </div>
      </div>
    </>
  )
}

Gauge.defaultProps = {
  maxValue: 3000,
  minValue: 0,
  animationSpeed: 32,
  options: {
    angle: 1,
    lineWidth: 0.44,
    radiusScale: 0.75,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: '#000000'
    },
    limitMax: false,
    limitMin: false,
    colorStart: '#6FADCF',
    colorStop: '#8FC0DA',
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true
  },
  donut: false,
  textChangeHandler: () => {}
}

Gauge.propTypes = {
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  animationSpeed: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
  donut: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  textChangeHandler: PropTypes.func.isRequired,
  interactionType: PropTypes.string,
  hitCount: PropTypes.number,
  orangeMilestoneCount: PropTypes.number,
  greenMilestoneCount: PropTypes.number,
  maxMilestoneCount: PropTypes.number,
  handleClick: PropTypes.func
}

export default Gauge
