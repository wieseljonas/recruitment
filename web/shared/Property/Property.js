/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex } from '@rebass/grid/emotion';
import { Formik, Field } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Link } from '../../controls/link';

import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';

import type { Property_property } from './__generated__/Property_property.graphql';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';

type PropertyData = {|
  lead?: Property_property,
|};

const PropertyFragment = createFragment<PropertyData>(
  graphql`
    fragment Property_property on Property {
      id
      numberOfRooms
      livingSurface
      landSurface
      numberOfParkings
    }
  `
);

const PropertyUpsertProperty = createMutation<
  PropertyUpsertMutation,
  {}
>(graphql`
  mutation PropertyUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        numberOfRooms
        livingSurface
        landSurface
        numberOfParkings
      }
    }
  }
`);

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

export const Property = (props: Props) => {
  return (
    <>
      <PropertyFragment property={props.property}>
        {({ property }) => (
          <Flex justifyContent="center">
            <Paper
              css={{ maxWidth: 960, marginTop: 16, width: '100%', padding: 16 }}
            >
              <Link href={{ pathname: '/properties' }}>
                <Button to="/properties" color="primary">
                  Back to properties
                </Button>
              </Link>
              <PropertyUpsertProperty>
                {({ mutate }) => (
                  <Formik
                    initialValues={{ ...property }}
                    onSubmit={values => {
                      mutate({ property: values });
                    }}
                    render={props => (
                      <form onSubmit={props.handleSubmit}>
                        <Field
                          name="name"
                          render={({ field /* _form */ }) => (
                            <TextField
                              {...field}
                              label="Name"
                              variant="outlined"
                              margin="normal"
                              fullWidth
                            />
                          )}
                        />
                        <Field
                          name="numberOfRooms"
                          render={({ field /* _form */ }) => (
                            <TextField
                              {...field}
                              label="Number of rooms"
                              variant="outlined"
                              margin="normal"
                              fullWidth
                            />
                          )}
                        />
                        <Field
                          name="livingSurface"
                          render={({ field /* _form */ }) => (
                            <TextField
                              {...field}
                              label="Living surface"
                              variant="outlined"
                              margin="normal"
                              fullWidth
                            />
                          )}
                        />
                        <Field
                          name="landSurface"
                          render={({ field /* _form */ }) => (
                            <TextField
                              {...field}
                              label="Land surface"
                              variant="outlined"
                              margin="normal"
                              fullWidth
                            />
                          )}
                        />
                        <Field
                          name="numberOfParking"
                          render={({ field /* _form */ }) => (
                            <TextField
                              {...field}
                              label="Number of parking"
                              variant="outlined"
                              margin="normal"
                              fullWidth
                            />
                          )}
                        />
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </form>
                    )}
                  />
                )}
              </PropertyUpsertProperty>
            </Paper>
          </Flex>
        )}
      </PropertyFragment>
    </>
  );
};
