import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Breadcrumbs, Typography } from '@mui/material'
import { ChevronRight, Home } from 'lucide-react'
import Content from '../content/content'
import routes from '../../navigation/routes'

const CustomBreadcrumbs = ({ children }) => {
  return (
    <Content>
        <Breadcrumbs aria-label='breadcrumb'
        separator={<ChevronRight />} >
        <Link underline='hover' color='inherit' href={`${routes.private.home}`}>
          <Home />
        </Link>
        <Typography color="primary" style={{ fontWeight: 500 }}>Encomendas</Typography>
      </Breadcrumbs>
    </Content>
  )
}
CustomBreadcrumbs.propTypes = {
  children: PropTypes.any
}
export default CustomBreadcrumbs
