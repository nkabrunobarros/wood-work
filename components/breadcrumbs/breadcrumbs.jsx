import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Breadcrumbs, Typography } from '@mui/material'
import { ChevronRight, Home } from 'lucide-react'
import Content from '../content/content'
import routes from '../../navigation/routes'
import { useRouter } from 'next/router'

const CustomBreadcrumbs = ({ children, path }) => {
  const router = useRouter()
  const style = {
    fontWeight: 500,
    color: 'inherit'
  }
  return (
    <Content>
      <Breadcrumbs aria-label='breadcrumb' separator={<ChevronRight />}>
        <Link underline='hover' color='inherit' href={`${routes.private.orders}`}>
          <Home />
        </Link>
        {path.map((crumb, i) => (
          <Typography key={i} style={style}>
            {router.asPath === crumb.href
              ? (
              <a style={{ color: 'var(--primary)' }}>{crumb.title}</a>
                )
              : (
              <>{crumb.title}</>
                )}
          </Typography>
        ))}
      </Breadcrumbs>
    </Content>
  )
}
CustomBreadcrumbs.propTypes = {
  children: PropTypes.any,
  path: PropTypes.any
}
export default CustomBreadcrumbs
