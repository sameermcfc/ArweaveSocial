import {gql} from '@apollo/client'

export const ACCOUNT_INFORMATION = 
      gql`
      query ($address: String!) {
        identity(address: $address) {
          address
          followingCount
          followerCount
          followers {
            list {
              address
            }
          }
          followings {
            list{
              address
            }
          }
        }
      }
      `
      ;

export const POPULAR_ACCOUNTS = 
      gql `
      query {
        popular(tags: { list: [PLAZA] }) {
          list {
            address
            ens
            followerCount
            isFollowing
            followerCount
          }
        }
      }
      `

export const GET_ENS = 
gql`
query ($address: String!) {
  identity(address: $address) {
      ens
  }
}
`