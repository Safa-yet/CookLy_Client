{/* <div className="grid lg:grid-cols-3 gap-8">

  {plans.map((plan) => (

    <Card
      key={plan.id}
      className={`border-2 ${
        plan.featured
          ? "border-success scale-105"
          : ""
      }`}
    >

      <CardBody className="p-8">

        <Chip
          color={
            plan.featured
              ? "success"
              : "default"
          }
        >
          {plan.badge}
        </Chip>

        <h2 className="text-3xl font-bold mt-4">
          {plan.name}
        </h2>

        <div className="mt-6">

          <span className="text-5xl font-bold">
            ${plan.price}
          </span>

          <span className="text-default-500">
            /{plan.period}
          </span>

        </div>

        <p className="mt-4 font-semibold text-success">
          {plan.recipes}
        </p>

        <Divider className="my-6" />

        <div className="space-y-4">

          {plan.features.map((feature) => (

            <div
              key={feature}
              className="flex gap-3"
            >
              <FiCheckCircle
                className="text-success mt-1"
              />

              <span>
                {feature}
              </span>

            </div>

          ))}

        </div>

        <Button
          color={
            plan.featured
              ? "success"
              : "default"
          }
          size="lg"
          fullWidth
          className="mt-8"
        >
          {plan.price === 0
            ? "Current Plan"
            : "Upgrade Now"}
        </Button>

      </CardBody>

    </Card>

  ))}

</div> */}