import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Breadcrumbs, Typography } from '@mui/material'
import { ChevronRight, Home } from 'lucide-react'
import routes from '../../navigation/routes'
import Router from 'next/router'

const CustomBreadcrumbs = ({ children, path }) => {
  const style = {
    fontWeight: 500,
    color: 'inherit'
  }

  const output = Object.keys(path).sort((a, b) => b - a)
  const arrayLenght = parseInt(output[0])

  return (
    <div
      style={{
        background: 'white',
        marginTop: '2rem',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Breadcrumbs aria-label='breadcrumb' separator={<ChevronRight />}>
        <Link
          underline='hover'
          color='inherit'
          href={`${routes.private.orders}`}
        >
          <a>
          <Home size={18} />

          </a>
        </Link>
        {path.map((crumb, i) => (
          <Typography key={i} style={style}>
            <>
              {i < arrayLenght
                ? (
                <a
                  onClick={() => Router.push(crumb.href)}
                  style={{
                    color: 'var(--inherit)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {crumb.title}
                </a>
                  )
                : (
                <a
                  style={{
                    color: 'var(--primary)',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  {crumb.title}
                </a>
                  )}
            </>
          </Typography>
        ))}
      </Breadcrumbs>
    </div>
  )
}
CustomBreadcrumbs.propTypes = {
  children: PropTypes.any,
  path: PropTypes.any
}
export default CustomBreadcrumbs
