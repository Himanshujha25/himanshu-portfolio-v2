import React from 'react'
import { motion } from "framer-motion"
import { staggerContainer } from '../utils/motion'

function SectionWrapper(Component, index) {
  return (
    function HOC() {
        return(
            <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}> {/* <-- Changed 0.25 to 0.1 */}
                <Component/>
            </motion.section>
        )
    }
  )
}

export default SectionWrapper