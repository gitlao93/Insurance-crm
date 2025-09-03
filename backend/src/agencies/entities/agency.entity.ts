import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "../../users/entities/user.entity"

@Entity("agencies")
export class Agency {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255 })
  agencyName: string

  @Column({ type: "varchar", length: 255 })
  street: string

  @Column({ type: "varchar", length: 255 })
  cityMunicipality: string

  @Column({ type: "varchar", length: 20 })
  postalCode: string

  @Column({ type: "boolean", default: true })
  isActive: boolean

  // Relations
  @OneToMany(
    () => User,
    (user) => user.agency,
  )
  users: User[]
}
