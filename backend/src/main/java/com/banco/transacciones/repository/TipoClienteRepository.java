package com.banco.transacciones.repository;

import com.banco.transacciones.entity.TipoCliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoClienteRepository extends JpaRepository<TipoCliente , Integer> {

}
