# Order Entity

## User

- id: string (primary key)
- cpf: string
  //- businessId: string (foreign key)

## Business

- id: string(primary key)

## Order

- Id
- Items
- Payment form

## Items

- Quantity
- Price
- Discount

## Relationships

- User has one business
- Business has many order
- Order has many items

# Sequence diagram
