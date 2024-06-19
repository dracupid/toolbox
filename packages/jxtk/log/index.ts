import { JLogger } from './logger'
import NodeConsoleReporter from './reporters/NodeConsoleReporter'
import AutoTagTransformer from './transformers/AutoTagTransformer'
import NodePrettyTransformer from './transformers/NodePrettyTransformer'

export function createLogger(appName = '') {
  const logger = new JLogger(appName)
  logger.addReporter(new NodeConsoleReporter())
  logger.addTransformer(new AutoTagTransformer())
  logger.addTransformer(new NodePrettyTransformer())
  return logger
}
