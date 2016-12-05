/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;



import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.*;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.user.User;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "credit_card_assets")
public class CreditCard implements Asset, Card {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private AssetType type;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "bankName")
    private String bankName;

    @Enumerated(EnumType.STRING)
    @Column(name = "paymentSystem")
    private PaymentSystemType paymentSystem;

    @Column(name = "creditLimit")
    private BigDecimal limit;

    @ManyToOne
    private Currency currency;

    @ManyToOne
    private User user;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public AssetType getType() {
        return type;
    }

    @Override
    public void setType(AssetType type) {
        this.type = type;
    }

    @Override
    public BigDecimal getAmount() {
        return amount;
    }

    @Override
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Override
    public BigDecimal addToAmount(BigDecimal addedAmount) {
        return getAmount().add(addedAmount);
    }

    @Override
    public BigDecimal extractFromAmount(BigDecimal extractedAmount) {
        return getAmount().subtract(extractedAmount);
    }

    @Override
    public String getBankName() {
        return bankName;
    }

    @Override
    public void setBankName(String name) {
        this.bankName = name;
    }

    @Override
    public PaymentSystemType getPaymentSystem() {
        return paymentSystem;
    }

    @Override
    public void setPaymentSystem(PaymentSystemType paymentSystem) {
        this.paymentSystem = paymentSystem;
    }

    public BigDecimal getLimit() {
        return limit;
    }

    public void setLimit(BigDecimal limit) {
        this.limit = limit;
    }

    @Override
    public Currency getCurrency() {
        return currency;
    }

    @Override
    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    @Override
    public User getUser() {
        return user;
    }

    @Override
    public void setUser(User user) {
        this.user = user;
    }

    // ~ ======== Hashcode and equals

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CreditCard that = (CreditCard) o;

        return getId().equals(that.getId());

    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
