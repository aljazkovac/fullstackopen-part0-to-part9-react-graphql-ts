import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
        props.setCancel(!props.cancel)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="outlined" onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </div>
            <Grid
                container
                spacing={2}
                style={showWhenVisible}
                className={'togglableContent'}
            >
                <Grid item xs={12}>
                    {props.children}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={toggleVisibility}>
                        cancel
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
