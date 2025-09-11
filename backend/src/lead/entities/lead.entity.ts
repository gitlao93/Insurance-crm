import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PolicyPlan } from "../../policies/entities/policy-plan.entity";

export enum LeadStatus {
  NEW = "New",
  IN_PROGRESS = "In-Progress",
  CONVERTED = "Converted",
  DROPPED = "Dropped",
}

@Entity("leads")
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  phoneNumber: string;

  @Column({ type: "enum", enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column()
  agentId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "agentId" })
  agent: User;

  @Column({ nullable: true })
  policyPlanId: number;

  @ManyToOne(() => PolicyPlan, (plan) => plan.id, { onDelete: "SET NULL" })
  @JoinColumn({ name: "policyPlanId" })
  policyPlan: PolicyPlan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
